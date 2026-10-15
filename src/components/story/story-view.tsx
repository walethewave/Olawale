'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';

import CvMenu from '@/components/cv-menu';
import ThemeToggle from '@/components/mode-toggle';
import PipelineFigure from '@/components/story/pipeline-figure';
import type { Stage } from '@/components/story/data';
import type { LayoutName } from '@/components/story/layouts';

import { cn } from '@/lib/utils';

export interface StorySlide {
  slug: string;
  title: string;
  short: string;
  year: string;
  track: 'production' | 'research';
  summary: string;
  caption: string;
  layout: LayoutName;
  stages: Stage[];
  tags: string[];
  href: string;
  website?: string;
  github?: string;
  // uploaded solution-architecture file (PDF/PPTX); falls back to the case-study section
  deckHref?: string;
}

interface StoryViewProps {
  slides: StorySlide[];
  activeTrack?: 'production' | 'research';
  authorName: string;
}

const tabs = [
  { label: 'All', value: undefined, href: '/projects' },
  { label: 'Production', value: 'production', href: '/projects?track=production' },
  { label: 'Research', value: 'research', href: '/projects?track=research' }
] as const;

const outlineBtn =
  'inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--line))] px-4 py-2.5 text-sm text-[hsl(var(--ink))] transition-colors hover:border-[hsl(var(--ink-soft))] hover:bg-[hsl(var(--ink))]/5';

const archBtn =
  'inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] px-5 py-2.5 text-sm font-medium text-black transition-transform hover:-translate-y-0.5';

function StoryView({ slides, activeTrack, authorName }: StoryViewProps) {
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, slideRefs.current.length - 1));
    slideRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Track which slide is on screen
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        });
      },
      { root, threshold: 0.6 }
    );
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [slides]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', 'j'].includes(e.key)) {
        e.preventDefault();
        goTo(active + 1);
      } else if (['ArrowUp', 'PageUp', 'k'].includes(e.key)) {
        e.preventDefault();
        goTo(active - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, goTo]);

  // Back to the first slide when the track changes
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
    setActive(0);
  }, [activeTrack]);

  const current = slides[active];
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="story-theme fixed inset-0 z-40">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[hsl(var(--paper))] to-transparent pb-8">
        <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between px-5 py-5 font-mono text-xs md:px-8">
          <Link href="/" className="hover:text-[hsl(var(--accent))]">
            {authorName}
          </Link>
          <div className="hidden text-[hsl(var(--ink-soft))] sm:block">
            <span className="text-[hsl(var(--ink))]">{pad(active + 1)}</span>
            {' / '}
            {pad(slides.length)} · {current?.short}
          </div>
          <div className="flex items-center gap-1.5">
            <nav className="flex rounded-full border border-[hsl(var(--line))] p-0.5">
              {tabs.map((tab) => (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className={cn(
                    'rounded-full px-3 py-1.5 transition-colors',
                    tab.value === activeTrack
                      ? 'bg-[hsl(var(--ink))] text-[hsl(var(--paper))]'
                      : 'text-[hsl(var(--ink-soft))] hover:text-[hsl(var(--ink))]'
                  )}
                >
                  {tab.label}
                </Link>
              ))}
            </nav>
            <CvMenu variant="outline" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Progress rail */}
      <nav
        aria-label="Projects"
        className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-end gap-2.5 md:flex"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${slide.short}`}
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em]"
          >
            <span
              className={cn(
                'transition-opacity',
                i === active
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100'
              )}
            >
              {pad(i + 1)} {slide.short}
            </span>
            <span
              className={cn(
                'h-px transition-all',
                i === active
                  ? 'w-9 bg-[hsl(var(--accent))]'
                  : 'w-4 bg-[hsl(var(--ink-soft))]/60 group-hover:w-6'
              )}
            />
          </button>
        ))}
      </nav>

      <div
        ref={scroller}
        data-lenis-prevent
        className="h-full snap-y snap-proximity overflow-y-auto scroll-smooth md:snap-mandatory"
      >
        {slides.map((slide, i) => (
          <section
            key={slide.slug}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            data-index={i}
            className="flex min-h-[100dvh] snap-start items-center"
          >
            <div
              className={cn(
                'mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-28 md:grid-cols-2 md:gap-16 md:px-8 md:pr-24'
              )}
            >
              <div className={cn(i % 2 === 1 && 'md:order-2')}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--ink-soft))]">
                  {slide.track} · {slide.year}
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[hsl(var(--ink-soft))] md:text-lg">
                  {slide.summary}
                </p>

                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {slide.tags.slice(0, 5).map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-[hsl(var(--line))] px-2.5 py-1 font-mono text-[11px] text-[hsl(var(--ink-soft))]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-2.5">
                  {slide.deckHref ? (
                    <a
                      href={slide.deckHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={archBtn}
                    >
                      Solution architecture
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href={`${slide.href}#solution-architecture`}
                      className={archBtn}
                    >
                      Solution architecture
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </Link>
                  )}
                  <Link href={slide.href} className={outlineBtn}>
                    Case study
                  </Link>
                  {slide.website && (
                    <a
                      href={slide.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={outlineBtn}
                    >
                      Live demo <ArrowUpRightIcon className="h-4 w-4" />
                    </a>
                  )}
                  {slide.github && (
                    <a
                      href={slide.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={outlineBtn}
                    >
                      GitHub <ArrowUpRightIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className={cn('mx-auto w-full max-w-md', i % 2 === 1 && 'md:order-1')}>
                <PipelineFigure
                  figNumber={i + 1}
                  caption={slide.caption}
                  layout={slide.layout}
                  stages={slide.stages}
                />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default StoryView;
