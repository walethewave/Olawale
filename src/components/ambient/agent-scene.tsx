'use client';
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  animate: boolean;
  dark: boolean;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}

const NODE_COUNT = 72;
const ORANGE = new THREE.Color('#ff6a2b');

// Small deterministic PRNG so the graph looks the same on every load
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Nodes scattered in a flattened ellipsoid, each linked to its nearest neighbours
function buildGraph() {
  const rand = mulberry32(11);
  const positions = new Float32Array(NODE_COUNT * 3);
  for (let i = 0; i < NODE_COUNT; i++) {
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const r = 0.45 + 0.55 * Math.cbrt(rand());
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 5.4;
    positions[i * 3 + 1] = r * Math.cos(phi) * 2.7;
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) * 3.2;
  }

  const edgeKeys = new Set<string>();
  const edges: [number, number][] = [];
  const neighbours: number[][] = Array.from({ length: NODE_COUNT }, () => []);
  for (let i = 0; i < NODE_COUNT; i++) {
    const nearest = Array.from({ length: NODE_COUNT }, (_, j) => j)
      .filter((j) => j !== i)
      .map((j) => ({
        j,
        d: Math.hypot(
          positions[i * 3] - positions[j * 3],
          positions[i * 3 + 1] - positions[j * 3 + 1],
          positions[i * 3 + 2] - positions[j * 3 + 2]
        )
      }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 3);
    for (const { j, d } of nearest) {
      if (d > 2.6) continue;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (edgeKeys.has(key)) continue;
      edgeKeys.add(key);
      edges.push([i, j]);
      neighbours[i].push(j);
      neighbours[j].push(i);
    }
  }
  return { positions, edges, neighbours };
}

function makeDotTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.45, 'rgba(255,255,255,0.9)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

// The network plus one autonomous agent hopping along its edges
function Network({ animate, dark, pointer }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const agent = useRef<THREE.Group>(null!);
  const pointsGeo = useRef<THREE.BufferGeometry>(null);
  const linesGeo = useRef<THREE.BufferGeometry>(null);
  const invalidate = useThree((s) => s.invalidate);

  const graph = useMemo(buildGraph, []);
  const dot = useMemo(makeDotTexture, []);

  const state = useRef({
    from: 0,
    to: 0,
    prev: -1,
    t: 1,
    nodeEnergy: new Float32Array(NODE_COUNT),
    edgeEnergy: new Float32Array(graph.edges.length),
    rotation: 0
  });

  const nodeColors = useMemo(() => new Float32Array(NODE_COUNT * 3), []);
  const edgeColors = useMemo(() => new Float32Array(graph.edges.length * 6), [graph]);
  const edgePositions = useMemo(() => {
    const arr = new Float32Array(graph.edges.length * 6);
    graph.edges.forEach(([a, b], i) => {
      arr.set(graph.positions.subarray(a * 3, a * 3 + 3), i * 6);
      arr.set(graph.positions.subarray(b * 3, b * 3 + 3), i * 6 + 3);
    });
    return arr;
  }, [graph]);

  const base = useMemo(
    () => (dark ? new THREE.Color('#8a8a8a') : new THREE.Color('#4a423c')),
    [dark]
  );
  const tmp = useMemo(() => new THREE.Color(), []);

  const writeColors = () => {
    const s = state.current;
    for (let i = 0; i < NODE_COUNT; i++) {
      tmp.copy(base).lerp(ORANGE, s.nodeEnergy[i]);
      nodeColors.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    graph.edges.forEach(([a, b], i) => {
      const e = Math.max(s.edgeEnergy[i], s.nodeEnergy[a] * 0.35, s.nodeEnergy[b] * 0.35);
      tmp.copy(base).lerp(ORANGE, e);
      edgeColors.set([tmp.r, tmp.g, tmp.b, tmp.r, tmp.g, tmp.b], i * 6);
    });
    if (pointsGeo.current) pointsGeo.current.attributes.color.needsUpdate = true;
    if (linesGeo.current) linesGeo.current.attributes.color.needsUpdate = true;
  };

  // Static first frame (also what reduced-motion users see)
  useEffect(() => {
    writeColors();
    invalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dark]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const s = state.current;

    // slow drift + gentle pointer parallax
    s.rotation += delta * 0.07;
    if (group.current) {
      group.current.rotation.y = s.rotation + pointer.current.x * 0.35;
      group.current.rotation.x += (pointer.current.y * 0.18 - group.current.rotation.x) * 0.05;
    }

    // agent walks one edge at a time
    s.t += delta / 0.85;
    if (s.t >= 1) {
      s.nodeEnergy[s.to] = 1;
      const edgeIndex = graph.edges.findIndex(
        ([a, b]) => (a === s.from && b === s.to) || (a === s.to && b === s.from)
      );
      if (edgeIndex >= 0) s.edgeEnergy[edgeIndex] = 1;

      s.prev = s.from;
      s.from = s.to;
      const options = graph.neighbours[s.from].filter((n) => n !== s.prev);
      const pool = options.length ? options : graph.neighbours[s.from];
      s.to = pool.length ? pool[Math.floor(Math.random() * pool.length)] : s.from;
      s.t = 0;
    }
    const k = s.t * s.t * (3 - 2 * s.t);
    const p = graph.positions;
    agent.current?.position.set(
      p[s.from * 3] + (p[s.to * 3] - p[s.from * 3]) * k,
      p[s.from * 3 + 1] + (p[s.to * 3 + 1] - p[s.from * 3 + 1]) * k,
      p[s.from * 3 + 2] + (p[s.to * 3 + 2] - p[s.from * 3 + 2]) * k
    );

    // glow fades after the agent leaves
    const nodeDecay = Math.exp(-delta * 0.7);
    const edgeDecay = Math.exp(-delta * 0.55);
    for (let i = 0; i < NODE_COUNT; i++) s.nodeEnergy[i] *= nodeDecay;
    for (let i = 0; i < s.edgeEnergy.length; i++) s.edgeEnergy[i] *= edgeDecay;
    writeColors();
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry ref={pointsGeo}>
          <bufferAttribute attach="attributes-position" array={graph.positions} count={NODE_COUNT} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={nodeColors} count={NODE_COUNT} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          sizeAttenuation
          vertexColors
          map={dot}
          alphaMap={dot}
          transparent
          depthWrite={false}
          alphaTest={0.02}
        />
      </points>

      <lineSegments>
        <bufferGeometry ref={linesGeo}>
          <bufferAttribute attach="attributes-position" array={edgePositions} count={graph.edges.length * 2} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={edgeColors} count={graph.edges.length * 2} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={dark ? 0.35 : 0.4} depthWrite={false} />
      </lineSegments>

      {animate && (
        <Trail width={1.1} length={9} decay={1.4} color="#ff6a2b" attenuation={(t) => t * t} target={agent}>
          <group ref={agent}>
            <mesh>
              <sphereGeometry args={[0.1, 20, 20]} />
              <meshBasicMaterial color="#ff6a2b" />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.26, 20, 20]} />
              <meshBasicMaterial color="#ff6a2b" transparent opacity={0.22} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
          </group>
        </Trail>
      )}
    </group>
  );
}

export default function AgentScene(props: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9.5], fov: 50 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      frameloop={props.animate ? 'always' : 'demand'}
      style={{ pointerEvents: 'none' }}
    >
      <Network {...props} />
    </Canvas>
  );
}
