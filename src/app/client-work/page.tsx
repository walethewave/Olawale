import React from 'react';
import { clientWork } from '@/app/source';
import TextReveal from '@/components/text-reveal';
import Line from '@/components/line';

import { createMetadata } from '@/lib/metadata';
import NdaDisclaimer from '@/components/nda-disclaimer';
import ClientProjectCard from '@/app/client-work/_components/client-project-card';

export const metadata = createMetadata({
  title: 'Client Work',
  description:
    'Selected client engagements. Client names are withheld under NDA — these are the technical solutions and architectures I built.'
});

export default function ClientWorkPage(): React.ReactElement {
  const projects = [...clientWork.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? b.file.name).getTime() -
      new Date(a.data.date ?? a.file.name).getTime()
  );

  return (
    <main className="my-14 flex-1">
      <section
        className="relative flex min-h-[calc(50dvh)] items-center justify-center"
        id="hero"
      >
        <div className="flex flex-col items-center md:max-w-7xl">
          <h1 className="leading-wide tracking-relaxed text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
            <TextReveal delay={0.2}>Client Work</TextReveal>
          </h1>

          <Line className={'mt-16'} />
        </div>
      </section>

      <div className="mx-auto mb-8 max-w-3xl px-4">
        <NdaDisclaimer />
      </div>

      <section className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 2xl:grid-cols-3">
        {projects.map((project, index) => (
          <ClientProjectCard
            title={project.data.title}
            href={project.url}
            description={project.data.description}
            industry={project.data.industry}
            key={`client_project_${index}`}
            tags={project.data.tags}
            thumbnail={
              project.data.thumbnail ??
              `/images/client-work/${project.slugs[0]}/cover.jpg`
            }
          />
        ))}
      </section>
    </main>
  );
}
