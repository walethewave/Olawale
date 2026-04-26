import Link from 'next/link';
import { project } from '@/app/source';
import TextReveal from '@/components/text-reveal';
import Line from '@/components/line';
import React from 'react';

import { createMetadata } from '@/lib/metadata';
import ProjectCard from '@/app/projects/_components/project-card';

const confidenceAIProject = {
  title: 'ConfidenceAI — Live Coaching Platform',
  description:
    'Real-time AI confidence coaching with explainable scoring. Not generic motivational text — structured psychological frameworks delivered through Google Gemini with session memory. Pydantic validation ensures consistent, structured output every session.',
  href: '/projects/confidence_ai_coaching',
  website: 'https://9punzdhswetzx92taubijy.streamlit.app/',
  github: 'https://github.com/walethewave/AI-Powered-Confidence-Coaching-App',
  tags: [
    { label: 'Google Gemini' },
    { label: 'Streamlit' },
    { label: 'Pydantic' },
    { label: 'Python' },
    { label: 'Live Deployment' }
  ],
  thumbnail: '/images/projects/confidence_ai_coaching/cover.jpg'
};

export const metadata = createMetadata({
  title: 'Projects',
  description: 'Here are some projects I have worked on.'
});

export default function ProjectsPage(): React.ReactElement {
  const projects = [...project.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? b.file.name).getTime() -
      new Date(a.data.date ?? a.file.name).getTime()
  );

  const displayProjects = [
    ...projects
      .filter((project) => project.data.title !== confidenceAIProject.title)
      .slice(0, 2)
      .map((project) => ({
        title: project.data.title,
        description: project.data.description,
        href: project.url,
        website: project.data.website,
        github: project.data.github,
        tags: project.data.tags,
        thumbnail: `/images/projects/${project.slugs[0]}/cover.jpg`
      })),
    confidenceAIProject,
    ...projects
      .filter((project) => project.data.title !== confidenceAIProject.title)
      .slice(2)
      .map((project) => ({
        title: project.data.title,
        description: project.data.description,
        href: project.url,
        website: project.data.website,
        github: project.data.github,
        tags: project.data.tags,
        thumbnail: `/images/projects/${project.slugs[0]}/cover.jpg`
      }))
  ];

  return (
    <main className="my-14 flex-1">
      <section
        className="relative flex min-h-[calc(50dvh)] items-center justify-center"
        id="hero"
      >
        <div className="flex flex-col items-center md:max-w-7xl">
          <h1 className="leading-wide tracking-relaxed text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
            <TextReveal delay={0.2}>My Projects</TextReveal>
          </h1>

          <Line className={'mt-16'} />
        </div>
        {/*<motion.div*/}
        {/*  className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"*/}
        {/*  style={{ opacity }}*/}
        {/*  animate={{ y: [0, 10, 0] }}*/}
        {/*  transition={{ duration: 1.5, repeat: Infinity }}*/}
        {/*>*/}
        {/*  <ChevronDown className="h-8 w-8" />*/}
        {/*</motion.div>*/}
      </section>
      {/*className="container max-sm:px-0 md:py-12"*/}
      <section className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 2xl:grid-cols-3">
        {displayProjects.map((project, index) => (
          <ProjectCard
            title={project.title}
            href={project.href}
            description={project.description}
            website={project.website}
            github={project.github}
            key={`project_${index}`}
            tags={project.tags}
            thumbnail={project.thumbnail}
          />
        ))}
      </section>
    </main>
  );
}
