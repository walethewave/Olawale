'use client';

import React from 'react';
import MotionWrap from '@/components/motion-wrap';
import TextReveal from '@/components/text-reveal';
import Reveal from '@/components/reveal';
import { testimonials } from './config';

function Testimonials() {
  return (
    <MotionWrap className="w-full py-24 lg:py-32" id="testimonials">
      <div className="space-y-10 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <Reveal>
            <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
              What Clients Say
            </h2>
          </Reveal>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={`testimonial_${index}`}
              className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-900/50"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-500">
                    ★
                  </span>
                ))}
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                <TextReveal>&quot;{testimonial.text}&quot;</TextReveal>
              </p>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MotionWrap>
  );
}

export default Testimonials;
