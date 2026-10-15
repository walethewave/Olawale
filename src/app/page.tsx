import { Header, Hero, Skills } from '@/components/sections';

import SmoothScroll from '@/components/smooth-scroll';

export default function Home() {
  return (
    <SmoothScroll>
      <div className="home-theme flex min-h-[100dvh] flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <Skills />
        </main>
      </div>
    </SmoothScroll>
  );
}
