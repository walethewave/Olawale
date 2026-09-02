import {
  allProjects,
  allBlogs,
  allClientWorks,
  allProjectMetas,
  allBlogMetas,
  allClientWorkMetas
} from 'content-collections';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from '@fumadocs/content-collections';

export const project = loader({
  baseUrl: '/projects',
  source: createMDXSource(allProjects, allProjectMetas)
});

export const clientWork = loader({
  baseUrl: '/client-work',
  source: createMDXSource(allClientWorks, allClientWorkMetas)
});

export const blog = loader({
  baseUrl: '/blog',
  source: createMDXSource(allBlogs, allBlogMetas)
});
