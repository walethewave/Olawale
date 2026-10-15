'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useReducedMotion } from 'framer-motion';

// three.js is heavy, so it loads only in the browser, after the page is usable
const AgentScene = dynamic(() => import('@/components/ambient/agent-scene'), {
  ssr: false
});

// Self-running 3D neural network: an agent hops node to node with no input needed.
// Pauses when scrolled away or the tab is hidden; static frame for reduced motion.
function AgentNetwork() {
  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const wrapper = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.05
    });
    observer.observe(el);

    const onVisibility = () => setTabVisible(!document.hidden);
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div
      ref={wrapper}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_72%)]"
    >
      <AgentScene
        animate={onScreen && tabVisible && !reduceMotion}
        dark={resolvedTheme === 'dark'}
        pointer={pointer}
      />
    </div>
  );
}

export default AgentNetwork;
