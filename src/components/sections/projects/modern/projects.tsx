'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';

import MotionWrap from '@/components/motion-wrap';
import ProjectCard from './project-card';
import Reveal from '@/components/reveal';
import { project } from '@/app/source';

// px per millisecond — lower = slower
const SPEED = 0.035;

function MarqueeTrack({
  projects,
  paused
}: {
  projects: ReturnType<typeof project.getPages>;
  paused: boolean;
}) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    const trackEl = trackRef.current;
    if (!trackEl) return;
    // Width of one full set of cards (half the duplicated track)
    const halfWidth = trackEl.scrollWidth / 2;
    const next = x.get() - delta * SPEED;
    // Reset seamlessly when first copy scrolls off
    x.set(next <= -halfWidth ? 0 : next);
  });

  // Duplicate cards for seamless infinite loop
  const items = [...projects, ...projects];

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        ref={trackRef}
        className="flex gap-4 will-change-transform"
        style={{ x }}
      >
        {items.map((proj, index) => (
          <div
            key={`marquee_${index}`}
            className="w-[260px] shrink-0 sm:w-[300px] lg:w-[340px]"
          >
            <ProjectCard
              title={proj.data.title}
              href={proj.url}
              description={proj.data.description}
              tags={proj.data.tags}
              thumbnail={`/images/projects/${proj.slugs[0]}/cover.jpg`}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Projects() {
  const [paused, setPaused] = useState(false);

  const projects = [...project.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? b.file.name).getTime() -
      new Date(a.data.date ?? a.file.name).getTime()
  );

  return (
    <MotionWrap className="w-full py-24 lg:py-32" id="projects">
      {/* Section heading */}
      <div className="mb-10 px-4 md:px-6">
        <div className="flex w-full flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <Reveal>
              <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                My
              </h2>
            </Reveal>
            <Reveal>
              <h2 className="-mt-2 text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                Projects
              </h2>
            </Reveal>
          </div>
          <p className="mt-4 hidden text-gray-500 dark:text-gray-400 lg:mt-0 lg:block lg:w-[35%]">
            Here are some of my projects where I&apos;ve turned code into
            cool, functional stuff.
          </p>
        </div>
      </div>

      {/* Infinite marquee — hover to pause */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <MarqueeTrack projects={projects} paused={paused} />
      </div>
    </MotionWrap>
  );
}

export default Projects;
