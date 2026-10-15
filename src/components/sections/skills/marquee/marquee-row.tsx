'use client';
import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from 'framer-motion';

interface MarqueeRowProps {
  items: string[];
  // % of the track per second; negative = leftwards
  speed: number;
}

// Keeps v inside [min, max) so the track loops without a visible jump
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

// One row of skill pills that streams on its own, speeds up while the page
// scrolls and flips direction when you scroll back up.
function MarqueeRow({ items, speed }: MarqueeRowProps) {
  const reduceMotion = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const inView = useInView(container);
  const hovered = useRef(false);
  const direction = useRef(speed < 0 ? -1 : 1);

  const offset = useMotionValue(0);
  const { scrollY } = useScroll();
  const smoothVelocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  useAnimationFrame((_, delta) => {
    if (reduceMotion || !inView || hovered.current) return;
    const base = Math.abs(speed) * (delta / 1000);
    const scrollBoost = boost.get();
    // scrolling down streams one way, scrolling up reverses it
    if (scrollBoost < -0.05) direction.current = speed < 0 ? 1 : -1;
    else if (scrollBoost > 0.05) direction.current = speed < 0 ? -1 : 1;
    const step = base * (1 + Math.abs(scrollBoost));
    offset.set(offset.get() + direction.current * step);
  });

  const x = useTransform(offset, (v) => `${wrap(-50, 0, v)}%`);
  // Four copies, so shifting by -50% lands exactly on an identical frame
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={container}
      className="marquee-mask flex overflow-hidden"
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      <motion.ul className="flex shrink-0 gap-3 pr-3" style={{ x }}>
        {loop.map((skill, i) => (
          <li
            key={`${skill}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[hsl(var(--line))] px-6 py-3 font-serif text-2xl sm:text-3xl"
          >
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
            {skill}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

export default MarqueeRow;
