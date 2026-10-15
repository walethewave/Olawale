// Geometry for the pipeline figures. Every project gets its own shape:
// node positions live in a 420 x 460 view box, plus the plate shape and size.

export type LayoutName =
  | 'zigzag'
  | 'dual'
  | 'staircase'
  | 'belt'
  | 'snake'
  | 'ring'
  | 'funnel'
  | 'strip'
  | 'grid'
  | 'spiral'
  | 'fork'
  | 'arc'
  | 'cross'
  | 'wave'
  | 'rise';

export type PlateShape = 'diamond' | 'hex' | 'disc';

export interface Node {
  x: number;
  y: number;
  hw: number;
  hh: number;
}

export interface Layout {
  nodes: Node[];
  edges: [number, number][];
  shape: PlateShape;
  // floating stack: upper plates paint over lower ones
  stacked?: boolean;
  // draw a dashed edge from the last node back to the first
  loop?: boolean;
}

const chain = (n: number): [number, number][] =>
  Array.from({ length: n - 1 }, (_, i) => [i, i + 1]);

const node = (x: number, y: number, hw: number, ratio = 0.5): Node => ({
  x,
  y,
  hw,
  hh: hw * ratio
});

export function buildLayout(name: LayoutName, n: number): Layout {
  switch (name) {
    case 'zigzag':
      return {
        shape: 'diamond',
        nodes: Array.from({ length: n }, (_, i) =>
          node(i % 2 === 0 ? 120 : 300, 62 + i * (340 / (n - 1)), 78)
        ),
        edges: chain(n)
      };

    case 'dual':
      return {
        shape: 'diamond',
        nodes: [
          node(210, 72, 66),
          node(105, 190, 66),
          node(315, 190, 66),
          node(315, 312, 66),
          node(210, 410, 66)
        ].slice(0, n),
        edges: [
          [0, 1],
          [0, 2],
          [2, 3],
          [1, 4],
          [3, 4]
        ]
      };

    case 'staircase':
      return {
        shape: 'diamond',
        nodes: Array.from({ length: n }, (_, i) =>
          node(72 + i * (276 / (n - 1)), 62 + i * (330 / (n - 1)), 58)
        ),
        edges: chain(n)
      };

    case 'belt':
      return {
        shape: 'diamond',
        nodes: Array.from({ length: n }, (_, i) =>
          node(70 + i * 70, 140 + i * 38, 62, 0.42)
        ),
        edges: chain(n)
      };

    case 'snake': {
      const top = [80, 210, 340];
      const xs = [...top, ...[...top].reverse()];
      return {
        shape: 'hex',
        nodes: Array.from({ length: n }, (_, i) =>
          node(xs[i], i < 3 ? 120 : 310, 54, 0.58)
        ),
        edges: chain(n)
      };
    }

    case 'ring':
      return {
        shape: 'disc',
        loop: true,
        nodes: Array.from({ length: n }, (_, i) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
          return node(210 + 125 * Math.cos(a), 235 + 150 * Math.sin(a), 56, 0.55);
        }),
        edges: chain(n)
      };

    case 'funnel':
      return {
        shape: 'diamond',
        stacked: true,
        nodes: Array.from({ length: n }, (_, i) =>
          node(210, 85 + i * 66, 135 - i * (85 / (n - 1)), 0.3)
        ),
        edges: chain(n)
      };

    case 'strip':
      return {
        shape: 'hex',
        nodes: Array.from({ length: n }, (_, i) =>
          node(62 + i * (296 / (n - 1)), i % 2 === 0 ? 200 : 260, 46, 0.58)
        ),
        edges: chain(n)
      };

    case 'grid': {
      const pos = [
        [130, 150],
        [290, 150],
        [130, 320],
        [290, 320]
      ];
      return {
        shape: 'diamond',
        nodes: pos.slice(0, n).map(([x, y]) => node(x, y, 64)),
        edges: chain(n)
      };
    }

    case 'spiral':
      return {
        shape: 'disc',
        loop: false,
        nodes: Array.from({ length: n }, (_, i) => {
          const a = -Math.PI / 2 + i * 1.15;
          const r = 165 - i * (105 / (n - 1));
          return node(210 + r * Math.cos(a), 240 + r * 0.9 * Math.sin(a), 36, 0.55);
        }),
        edges: chain(n)
      };

    case 'fork':
      return {
        shape: 'disc',
        nodes: [
          node(210, 62, 62, 0.5),
          node(210, 160, 62, 0.5),
          node(210, 258, 62, 0.5),
          node(105, 380, 62, 0.5),
          node(315, 380, 62, 0.5)
        ].slice(0, n),
        edges: [
          [0, 1],
          [1, 2],
          [2, 3],
          [2, 4]
        ]
      };

    case 'arc':
      return {
        shape: 'hex',
        nodes: Array.from({ length: n }, (_, i) => {
          const t = (i - (n - 1) / 2) / ((n - 1) / 2);
          return node(52 + i * (316 / (n - 1)), 390 - (1 - t * t) * 270, 30, 0.58);
        }),
        edges: chain(n)
      };

    case 'cross': {
      const pos = [
        [92, 112],
        [328, 112],
        [210, 232],
        [92, 352],
        [328, 352]
      ];
      return {
        shape: 'diamond',
        nodes: pos.slice(0, n).map(([x, y]) => node(x, y, 60)),
        edges: chain(n)
      };
    }

    case 'wave':
      return {
        shape: 'disc',
        nodes: Array.from({ length: n }, (_, i) =>
          node(52 + i * (316 / (n - 1)), i % 2 === 0 ? 290 : 170, 38, 0.55)
        ),
        edges: chain(n)
      };

    case 'rise':
      return {
        shape: 'diamond',
        nodes: Array.from({ length: n }, (_, i) =>
          node(62 + i * (296 / (n - 1)), 385 - i * (290 / (n - 1)), 50)
        ),
        edges: chain(n)
      };
  }
}
