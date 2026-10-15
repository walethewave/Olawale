'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { buildLayout, LayoutName, Node, PlateShape } from '@/components/story/layouts';
import type { Stage } from '@/components/story/data';

import { cn } from '@/lib/utils';

interface PipelineFigureProps {
  figNumber: number;
  caption: string;
  stages: Stage[];
  layout: LayoutName;
}

const STEP_MS = 1200;
const VIEW_W = 420;
const VIEW_H = 460;
const THICK = 9;
const ORANGE = 'hsl(var(--accent))';

type PlateState = 'idle' | 'done' | 'active';

// One plate: a flat slab in the given shape, with its number on top
function Plate({
  node,
  shape,
  state,
  label
}: {
  node: Node;
  shape: PlateShape;
  state: PlateState;
  label: string;
}) {
  const { x, y, hw, hh } = node;
  const stroke =
    state === 'idle'
      ? 'hsl(var(--plate-stroke))'
      : state === 'done'
        ? 'hsl(var(--accent) / 0.55)'
        : ORANGE;
  const topFill = state === 'active' ? 'hsl(var(--accent) / 0.22)' : 'hsl(var(--plate-top))';
  const sideA = 'hsl(var(--plate-a))';
  const sideB = 'hsl(var(--plate-b))';

  let body: React.ReactNode;
  if (shape === 'disc') {
    body = (
      <>
        <path
          d={`M ${x - hw} ${y} L ${x - hw} ${y + THICK} A ${hw} ${hh} 0 0 0 ${x + hw} ${y + THICK} L ${x + hw} ${y} A ${hw} ${hh} 0 0 1 ${x - hw} ${y} Z`}
          fill={sideA}
          stroke={stroke}
        />
        <ellipse cx={x} cy={y} rx={hw} ry={hh} style={{ fill: topFill, stroke, transition: 'fill 0.4s, stroke 0.4s' }} strokeWidth="1.2" />
        <ellipse cx={x} cy={y} rx={hw * 0.55} ry={hh * 0.55} style={{ fill: 'none', stroke }} strokeOpacity="0.35" />
      </>
    );
  } else if (shape === 'hex') {
    const top = `${x - hw},${y} ${x - hw / 2},${y - hh} ${x + hw / 2},${y - hh} ${x + hw},${y} ${x + hw / 2},${y + hh} ${x - hw / 2},${y + hh}`;
    const side = `${x - hw},${y} ${x - hw / 2},${y + hh} ${x + hw / 2},${y + hh} ${x + hw},${y} ${x + hw},${y + THICK} ${x + hw / 2},${y + hh + THICK} ${x - hw / 2},${y + hh + THICK} ${x - hw},${y + THICK}`;
    body = (
      <>
        <polygon points={side} style={{ fill: sideA, stroke }} />
        <polygon points={top} style={{ fill: topFill, stroke, transition: 'fill 0.4s, stroke 0.4s' }} strokeWidth="1.2" />
        <polygon
          points={`${x - hw * 0.55},${y} ${x - hw * 0.28},${y - hh * 0.55} ${x + hw * 0.28},${y - hh * 0.55} ${x + hw * 0.55},${y} ${x + hw * 0.28},${y + hh * 0.55} ${x - hw * 0.28},${y + hh * 0.55}`}
          fill="none"
          stroke={stroke}
          strokeOpacity="0.35"
        />
      </>
    );
  } else {
    const top = `${x},${y - hh} ${x + hw},${y} ${x},${y + hh} ${x - hw},${y}`;
    const left = `${x - hw},${y} ${x},${y + hh} ${x},${y + hh + THICK} ${x - hw},${y + THICK}`;
    const right = `${x + hw},${y} ${x},${y + hh} ${x},${y + hh + THICK} ${x + hw},${y + THICK}`;
    body = (
      <>
        <polygon points={left} style={{ fill: sideA, stroke }} />
        <polygon points={right} style={{ fill: sideB, stroke }} />
        <polygon points={top} style={{ fill: topFill, stroke, transition: 'fill 0.4s, stroke 0.4s' }} strokeWidth="1.2" />
        <line x1={x - hw / 2} y1={y - hh / 2} x2={x + hw / 2} y2={y + hh / 2} style={{ stroke }} strokeOpacity="0.3" />
        <line x1={x + hw / 2} y1={y - hh / 2} x2={x - hw / 2} y2={y + hh / 2} style={{ stroke }} strokeOpacity="0.3" />
      </>
    );
  }

  return (
    <g
      style={{
        transition: 'filter 0.4s',
        filter: state === 'active' ? 'drop-shadow(0 0 14px hsl(var(--accent) / 0.55))' : 'none'
      }}
    >
      {body}
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        className="font-mono"
        fontSize="12"
        style={{
          fill: state === 'idle' ? 'hsl(var(--ink-soft))' : state === 'active' ? ORANGE : 'hsl(var(--ink))',
          transition: 'fill 0.4s'
        }}
      >
        {label}
      </text>
    </g>
  );
}

function PipelineFigure({ figNumber, caption, stages, layout }: PipelineFigureProps) {
  const count = stages.length;
  // -1 idle, 0..count-1 running, count and above = finished (held for a beat)
  const [step, setStep] = useState(-1);
  const [visible, setVisible] = useState(false);
  const card = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const geometry = useMemo(() => buildLayout(layout, count), [layout, count]);
  const { nodes, edges, shape } = geometry;

  // Run on its own while the slide is on screen
  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.6
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduceMotion) {
      setStep(-1);
      return;
    }
    const interval = setInterval(() => {
      // idle -> stages -> finished (held two beats) -> idle -> loop
      setStep((s) => (s >= count + 1 ? -1 : s + 1));
    }, STEP_MS);
    return () => clearInterval(interval);
  }, [visible, reduceMotion, count]);

  // Click restarts the run; with reduced motion it steps through one stage per click
  const run = () => {
    if (reduceMotion) {
      setStep((s) => (s >= count - 1 ? -1 : s + 1));
      return;
    }
    setStep(0);
  };

  const running = step >= 0 && step < count;
  const finished = step >= count;
  const reached = finished ? count - 1 : step; // highest node reached so far
  const hint = reduceMotion
    ? 'CLICK TO STEP'
    : running
      ? 'RUNNING LIVE'
      : finished
        ? 'DONE · LOOPING'
        : 'STARTING';
  const status = running
    ? `${step + 1}/${count} · ${stages[step].note}`
    : finished
      ? 'done'
      : 'idle';

  const packet = nodes[running ? step : finished ? count - 1 : 0];

  // Draw order: floating stacks paint top-over-bottom, ground layouts paint far-to-near
  const order = nodes
    .map((_, i) => i)
    .sort((a, b) => (geometry.stacked ? nodes[b].y - nodes[a].y : nodes[a].y - nodes[b].y));

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <button
      ref={card}
      type="button"
      onClick={run}
      aria-label={`${caption}: pipeline animation, click to restart`}
      className="group relative flex w-full flex-col rounded-3xl border border-[hsl(var(--line))] bg-[hsl(var(--panel))] p-5 text-left transition-colors hover:border-[hsl(var(--accent))]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[hsl(var(--accent))]"
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--ink-soft))]">
        <span>Fig {figNumber}</span>
        <span>{caption}</span>
      </div>

      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="my-2 h-auto w-full" aria-hidden="true">
        {edges.map(([a, b]) => {
          const lit = running || finished ? Math.max(a, b) <= reached : false;
          return (
            <line
              key={`${a}-${b}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              strokeOpacity={lit ? 0.7 : 1}
              strokeDasharray={lit ? undefined : '2 6'}
              style={{ stroke: lit ? ORANGE : 'hsl(var(--plate-stroke))', transition: 'stroke 0.4s' }}
            />
          );
        })}
        {geometry.loop && (
          <line
            x1={nodes[count - 1].x}
            y1={nodes[count - 1].y}
            x2={nodes[0].x}
            y2={nodes[0].y}
            style={{ stroke: finished ? ORANGE : 'hsl(var(--plate-stroke))' }}
            strokeOpacity={finished ? 0.7 : 1}
            strokeDasharray="2 6"
          />
        )}

        {order.map((i) => {
          const state: PlateState =
            running && i === step ? 'active' : (running && i < step) || finished ? 'done' : 'idle';
          return (
            <Plate key={stages[i].label} node={nodes[i]} shape={shape} state={state} label={pad(i + 1)} />
          );
        })}

        <motion.circle
          r="6"
          style={{ fill: ORANGE, filter: 'drop-shadow(0 0 8px hsl(var(--accent)))' }}
          initial={{ cx: nodes[0].x, cy: nodes[0].y - 14 }}
          animate={{ cx: packet.x, cy: packet.y - 14, opacity: running || finished ? 1 : 0.6 }}
          transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 110, damping: 16 }}
        />
      </svg>

      <ol className="mb-4 flex flex-wrap gap-1.5">
        {stages.map((stage, i) => {
          const isActive = running && i === step;
          const isDone = (running && i < step) || finished;
          return (
            <li
              key={stage.label}
              className={cn(
                'rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors',
                isActive
                  ? 'border-[hsl(var(--accent))] text-[hsl(var(--accent))]'
                  : isDone
                    ? 'border-[hsl(var(--line))] text-[hsl(var(--ink))]'
                    : 'border-[hsl(var(--line))] text-[hsl(var(--ink-soft))]'
              )}
            >
              {pad(i + 1)} {stage.label}
            </li>
          );
        })}
      </ol>

      <div className="mt-auto flex items-end justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em]">
        <span className={cn('shrink-0', running ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--ink-soft))]')}>
          {hint}
        </span>
        <span className="min-h-[2.4em] max-w-[60%] text-right normal-case tracking-normal text-[hsl(var(--ink-soft))]">
          {status}
        </span>
      </div>
    </button>
  );
}

export default PipelineFigure;
