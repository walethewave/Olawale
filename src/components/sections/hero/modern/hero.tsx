'use client';
// Credit: Cuberto

import React from 'react';

import TextReveal from '@/components/text-reveal';
import Reveal from '@/components/reveal';

function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background/[0.96]">
      <div className="flex min-h-[50dvh] w-full flex-col items-center justify-center px-4 py-16 md:px-6 md:py-24">
        <h1 className="text-center text-4xl font-light leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          <TextReveal>An AI Engineer</TextReveal>
          <br />
          <span className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            <Reveal>who builds</Reveal>
            <Reveal>Intelligent Systems</Reveal>
          </span>
        </h1>
      </div>
    </section>
  );
}

export default Hero;
