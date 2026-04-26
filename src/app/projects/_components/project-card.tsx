import React from 'react';
import { CardContent, CardFooter, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import Image from 'next/image';
import { GithubIcon, GlobeIcon, InfoIcon } from 'lucide-react';

import { Project } from '@/types/project';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import TextReveal from '@/components/text-reveal';

interface ProjectCardProps extends Project {
  href: string;
  thumbnail: string;
  className?: string;
}

const featuredProjectTitle = 'ConfidenceAI — Live Coaching Platform';

const projectMetrics: Record<string, string> = {
  'Fighting Fraud with Machine Learning':
    '1M+ transactions · 0.3% fraud rate · 38 engineered features',
  'Dr. Amina — AI Healthcare for Northern Nigeria':
    '648 health documents · 80% confidence threshold · Hausa voice input',
  'Sign Language Hand Gesture Recognition with CNN':
    '99.75% accuracy · 25 ASL gestures',
  'ConfidenceAI — Live Coaching Platform':
    'Live deployment · Real user sessions',
  'Digital Lending E-Sign Prediction System':
    'Production-ready .pkl export · Real fintech workflow'
};

function ProjectCard({
  title,
  description,
  href,
  thumbnail,
  website,
  github,
  tags,
  className
}: ProjectCardProps) {
  const metrics = projectMetrics[title];
  const showFeaturedLinks = title === featuredProjectTitle;

  return (
    <Card
      className={cn(
        'relative flex h-full flex-col justify-between bg-muted/40',
        className
      )}
    >
      <CardContent className="p-4 md:p-6">
        <div className="grid gap-2">
          <Image
            src={thumbnail || '/placeholder.svg'}
            alt={`Image of ${title}`}
            sizes="100vw"
            width={500}
            height={300}
            className="mb-2 aspect-video h-auto w-full rounded-md object-cover"
          />
          <h3 className="text-xl font-bold">
            <TextReveal>{title}</TextReveal>
          </h3>
          {metrics && (
            <p className="text-xs font-mono leading-5 text-muted-foreground/80">
              <TextReveal>{metrics}</TextReveal>
            </p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <TextReveal>{description || ''}</TextReveal>
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <Badge key={`project-tag_${index}`}>{tag.label}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter
        className={cn(
          'flex items-center gap-2 p-4 md:p-6',
          showFeaturedLinks ? 'justify-between' : 'justify-end'
        )}
      >
        {showFeaturedLinks && (
          <div className="flex flex-wrap gap-2">
            {website && (
              <Button
                variant="outline"
                className="z-[2] rounded-full border bg-muted hover:bg-foreground/10"
                asChild
              >
                <a href={website} target="_blank" rel="noreferrer">
                  <GlobeIcon className="h-4 w-4" />
                  Live App
                </a>
              </Button>
            )}
            {github && (
              <Button
                variant="outline"
                className="z-[2] rounded-full border bg-muted hover:bg-foreground/10"
                asChild
              >
                <a href={github} target="_blank" rel="noreferrer">
                  <GithubIcon className="h-4 w-4" />
                  Code
                </a>
              </Button>
            )}
          </div>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="z-[2] rounded-full border bg-muted hover:bg-foreground/10"
                asChild
              >
                <Link href={href}>
                  <InfoIcon />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>More Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
      <Link href={href} className="z-1 absolute inset-0 block" />
    </Card>
  );
}

export default ProjectCard;
