'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface FeatureCardProps {
  index: number;
  href: string;
  image: string;
  imagePosition?: string;
  eyebrow: string;
  title: string;
  chips: string[];
  tilt: number;
  className?: string;
}

function FeatureCard({
  index,
  href,
  image,
  imagePosition = 'center',
  eyebrow,
  title,
  chips,
  tilt,
  className
}: FeatureCardProps) {
  return (
    <motion.div
      className={cn('w-full', className)}
      initial={{ opacity: 0, y: 60, rotate: tilt * 2 }}
      animate={{ opacity: 1, y: 0, rotate: tilt }}
      whileHover={{ y: -10, rotate: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.25 + index * 0.12,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <Link
        href={href}
        className="group relative block h-full overflow-hidden rounded-[28px] bg-[hsl(var(--ink))] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          style={{ objectPosition: imagePosition }}
          priority={index === 0}
          unoptimized={image.endsWith('.svg')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10" />

        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black">
          0{index + 1} · {eyebrow}
        </span>

        <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-colors duration-300 group-hover:bg-[hsl(var(--accent))] group-hover:text-white">
          <ArrowUpRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
        </span>

        <div className="absolute inset-x-5 bottom-5 text-white">
          <h3 className="font-serif text-3xl leading-[1.05] sm:text-4xl">
            {title}
          </h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[11px] font-medium backdrop-blur-md"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default FeatureCard;
