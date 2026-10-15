'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRightIcon, ChevronDownIcon } from 'lucide-react';

import { cvLinks } from '@/components/sections/header/config';

import { cn } from '@/lib/utils';

interface CvMenuProps {
  // filled = dark pill CTA, outline = bordered button
  variant: 'filled' | 'outline';
  className?: string;
}

// "CV" button that opens a small menu with the AI and ML versions.
// Rendered inline (no portal) so it inherits the surrounding theme tokens.
function CvMenu({ variant, className }: CvMenuProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center gap-1 rounded-full text-[13px] font-medium transition-colors sm:text-sm',
          variant === 'filled'
            ? 'bg-[hsl(var(--ink))] px-3.5 py-2 text-[hsl(var(--paper))] hover:bg-[hsl(var(--accent))] sm:px-4'
            : 'border border-[hsl(var(--line))] px-3 py-2 hover:border-[hsl(var(--ink-soft))]'
        )}
      >
        CV
        <ChevronDownIcon
          className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-[hsl(var(--line))] bg-[hsl(var(--paper))] p-1 text-[hsl(var(--ink))] shadow-xl"
        >
          {cvLinks.map((cv) => (
            <a
              key={cv.href}
              role="menuitem"
              href={cv.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm hover:bg-[hsl(var(--ink))]/10"
            >
              {cv.label}
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default CvMenu;
