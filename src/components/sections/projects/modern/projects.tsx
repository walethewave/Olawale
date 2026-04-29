import React from 'react';

import MotionWrap from '@/components/motion-wrap';
import ProjectCard from './project-card';

import Reveal from '@/components/reveal';
import { project } from '@/app/source';

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

function Projects() {
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
        thumbnail:
          project.data.thumbnail ?? `/images/projects/${project.slugs[0]}/cover.jpg`
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
        thumbnail:
          project.data.thumbnail ?? `/images/projects/${project.slugs[0]}/cover.jpg`
      }))
  ];

  return (
    <MotionWrap className="w-full py-24 lg:py-32" id="projects">
      <div className="space-y-4 px-4 md:px-6 lg:space-y-10">
        <div className="grid gap-10">
          <div className="flex w-full flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
              <Reveal>
                <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                  My
                </h2>
              </Reveal>
              <Reveal>
                <h2 className="-mt-2 text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                  Projects
                </h2>
              </Reveal>
            </div>
            <p className="mt-4 hidden text-gray-500 dark:text-gray-400 lg:mt-0 lg:block lg:w-[35%]">
              Here are some of my projects where I&apos;ve turned code into
              cool, functional stuff.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
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
          </div>
        </div>
      </div>
    </MotionWrap>
  );
}

export default Projects;
