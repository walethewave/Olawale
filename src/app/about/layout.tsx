import { Bricolage_Grotesque } from 'next/font/google';

import { Header } from '@/components/sections';

import Cursor from '@/components/cursor/cursor';
import SmoothScroll from '@/components/smooth-scroll';

import { createMetadata } from '@/lib/metadata';

// https://iamsteve.me/blog/the-best-ink-trap-typefaces-for-websites
const bricolage_grotesque = Bricolage_Grotesque({ subsets: ['latin'] });

export const metadata = createMetadata({
  title: 'About',
  description: 'Learn mroe about me and how I do things'
});

export default function AboutLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <div className={`flex min-h-[100dvh] flex-col ${bricolage_grotesque.className}`}>
        <Header />
        {children}
      </div>
      <Cursor />
    </SmoothScroll>
  );
}
