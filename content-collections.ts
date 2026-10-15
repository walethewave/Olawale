import { defineCollection, defineConfig } from '@content-collections/core';
import {
  createMetaSchema,
  createDocSchema,
  transformMDX
} from '@fumadocs/content-collections/configuration';

const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '**/*.mdx',
  schema: (z) => {
    const docSchema = createDocSchema(z);
    return {
      ...docSchema,
      website: z.string().optional(),
      github: z.string().optional(),
      thumbnail: z.string().optional(),
      architectureDeck: z.string().optional(),
      track: z.enum(['production', 'research']).optional(),
      tags: z
        .array(
          z.object({
            label: z.string()
          })
        )
        .optional(),
      date: z.string().date().or(z.date()).optional()
    };
  },
  transform: transformMDX
});

const projectMetas = defineCollection({
  name: 'projectMeta',
  directory: 'content/projects',
  include: '**/meta.json',
  parser: 'json',
  schema: createMetaSchema
});

const clientWork = defineCollection({
  name: 'clientWork',
  directory: 'content/client-work',
  include: '**/*.mdx',
  schema: (z) => {
    const docSchema = createDocSchema(z);
    return {
      ...docSchema,
      industry: z.string().optional(),
      role: z.string().optional(),
      thumbnail: z.string().optional(),
      architectureDeck: z.string().optional(),
      tags: z
        .array(
          z.object({
            label: z.string()
          })
        )
        .optional(),
      date: z.string().date().or(z.date()).optional()
    };
  },
  transform: transformMDX
});

const clientWorkMetas = defineCollection({
  name: 'clientWorkMeta',
  directory: 'content/client-work',
  include: '**/meta.json',
  parser: 'json',
  schema: createMetaSchema
});

const blog = defineCollection({
  name: 'blog',
  directory: 'content/blog',
  include: '**/*.mdx',
  schema: (z) => {
    const docSchema = createDocSchema(z);
    return {
      ...docSchema,
      author: z.string(),
      date: z.string().date().or(z.date()).optional()
    };
  },
  transform: transformMDX
});

const blogMetas = defineCollection({
  name: 'blogMeta',
  directory: 'content/blog',
  include: '**/meta.json',
  parser: 'json',
  schema: createMetaSchema
});

export default defineConfig({
  collections: [
    projects,
    projectMetas,
    clientWork,
    clientWorkMetas,
    blog,
    blogMetas
  ]
});
