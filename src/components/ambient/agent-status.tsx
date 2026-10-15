'use client';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Real work from the projects, shown as the agent's "current task"
const tasks = [
  'retrieving context from 648 verified health documents',
  'splitting a multi-part question into sub-queries',
  'scoring 1,000,000 transactions for fraud',
  'auditing a feature for look-ahead leakage',
  'parsing "10 cement at 5000" into a transaction',
  'reranking retrieved chunks against the original query',
  'explaining a flagged transaction with SHAP values'
];

const TYPE_MS = 38;
const HOLD_MS = 1700;
const ERASE_MS = 14;

function AgentStatus() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const task = tasks[index];
    let timer: ReturnType<typeof setTimeout>;

    if (length < task.length) {
      timer = setTimeout(() => setLength((l) => l + 1), TYPE_MS);
    } else {
      // hold the finished line, then wipe it and move to the next task
      timer = setTimeout(() => {
        const erase = setInterval(() => {
          setLength((l) => {
            if (l <= 1) {
              clearInterval(erase);
              setIndex((i) => (i + 1) % tasks.length);
              return 0;
            }
            return l - 2;
          });
        }, ERASE_MS);
      }, HOLD_MS);
    }
    return () => clearTimeout(timer);
  }, [index, length, reduceMotion]);

  const text = reduceMotion ? tasks[0] : tasks[index].slice(0, Math.max(length, 0));

  return (
    <p
      className="mt-6 flex min-h-[1.5rem] items-center gap-2 font-mono text-xs text-[hsl(var(--ink-soft))] sm:text-[13px]"
      aria-live="off"
    >
      <span className="flex items-center gap-1.5 text-[hsl(var(--accent))]">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(var(--accent))]" />
        agent
      </span>
      <span>
        {text}
        {!reduceMotion && <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-[hsl(var(--ink-soft))]" />}
      </span>
    </p>
  );
}

export default AgentStatus;
