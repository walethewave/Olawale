'use client';
import { motion } from 'framer-motion';
import AgentStatus from '@/components/ambient/agent-status';

const ease = [0.22, 1, 0.36, 1] as const;

function HeroHeading({ label }: { label: string }) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <motion.span
        className="rounded-full border border-[hsl(var(--line))] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[hsl(var(--ink-soft))]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        {label}
      </motion.span>

      <motion.h1
        className="mt-6 max-w-4xl font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
      >
        I build AI & ML systems that{' '}
        <em className="text-[hsl(var(--accent))]">ship.</em>
      </motion.h1>

      <motion.p
        className="mt-6 max-w-xl text-base text-[hsl(var(--ink-soft))] md:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
      >
        RAG systems, ML pipelines and the architecture behind them.
      </motion.p>

      <AgentStatus />
    </div>
  );
}

export default HeroHeading;
