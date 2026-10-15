import React from 'react';
import fs from 'fs';
import path from 'path';

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

// Drop a file at public/architecture/projects/<slug>/deck.pdf (or deck.pptx)
// and the Solution architecture button opens it automatically.
function findDeck(slug: string): string | undefined {
  const dir = path.join(process.cwd(), 'public', 'architecture', 'projects', slug);
  for (const file of ['deck.pdf', 'deck.pptx']) {
    if (fs.existsSync(path.join(dir, file))) {
      return `/architecture/projects/${slug}/${file}`;
    }
  }
  return undefined;
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
        deckHref: findDeck(slug)
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
