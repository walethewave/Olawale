'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import ThemeToggle from '@/components/mode-toggle';
import CvMenu from '@/components/cv-menu';
import { pillLinks } from '@/components/sections/header/config';

import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <motion.header
      className="fixed inset-x-0 top-4 z-20 flex justify-center px-3"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="flex items-center gap-1 rounded-full border border-[hsl(var(--line))] bg-[hsl(var(--paper))]/75 p-1.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        {pillLinks.map((link) => {
          const external = 'external' in link && link.external;
          return (
            <Link
              key={link.title}
              href={link.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className={cn(
                'group flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm',
                'text-[hsl(var(--ink-soft))] hover:bg-[hsl(var(--ink))]/10 hover:text-[hsl(var(--ink))]'
              )}
            >
              {link.title}
              {external && (
                <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              )}
            </Link>
          );
        })}
        <CvMenu variant="filled" />
        <div className="[&_button]:h-8 [&_button]:w-8 sm:[&_button]:h-10 sm:[&_button]:w-10">
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
