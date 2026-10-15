import React from 'react';

import { project } from '@/app/source';
import { metadata as meta } from '@/app/config';
import StoryView, { StorySlide } from '@/components/story/story-view';
import {
  productionOrder,
  researchOrder,
  story
} from '@/components/story/data';

import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Projects',
  description: 'Here are some projects I have worked on.'
});

type Track = 'production' | 'research';

const GITHUB_PROFILE = 'https://github.com/walethewave';
// Repos that are private, so a direct link would 404 for visitors
const privateRepos = new Set(['insightflow', 'groundwork']);

// Every project ships a deck at this path. Replace the file (keep the name
// deck.pdf) to swap in your own; public/ files are served from the CDN, so the
// path is fixed rather than checked on disk at request time.
function deckPath(slug: string): string {
  return `/architecture/projects/${slug}/deck.pdf`;
}

function buildSlides(track?: Track): StorySlide[] {
  const pages = project.getPages();
  const order =
    track === 'production'
      ? productionOrder
      : track === 'research'
        ? researchOrder
        : [...productionOrder, ...researchOrder];

  return order.flatMap((slug): StorySlide[] => {
    const page = pages.find((p) => p.slugs[0] === slug);
    const entry = story[slug];
    if (!page || !entry) return [];

    return [
      {
        slug,
        title: page.data.title,
        short: entry.short,
        year: new Date(page.data.date ?? Date.now()).getFullYear().toString(),
        track: productionOrder.includes(slug) ? 'production' : 'research',
        summary: entry.summary,
        caption: entry.caption,
        layout: entry.layout,
        stages: entry.stages,
        tags: (page.data.tags ?? []).map((t) => t.label),
        href: page.url,
        website: page.data.website,
        github: privateRepos.has(slug) ? GITHUB_PROFILE : page.data.github,
        deckHref: deckPath(slug)
      }
    ];
  });
}

export default function ProjectsPage({
  searchParams
}: {
  searchParams?: { track?: string };
}): React.ReactElement {
  const track: Track | undefined =
    searchParams?.track === 'production' || searchParams?.track === 'research'
      ? searchParams.track
      : undefined;

  return (
    <StoryView
      slides={buildSlides(track)}
      activeTrack={track}
      authorName={meta.author.name}
    />
  );
}
