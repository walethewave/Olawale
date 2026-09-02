import type { MetadataRoute } from 'next';

import { project, blog, clientWork } from '@/app/source';
import { baseUrl } from '@/lib/metadata';

function toDate(value?: string | Date): Date | undefined {
  if (!value) return undefined;
  return value instanceof Date ? value : new Date(value);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/projects`,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/client-work`,
      changeFrequency: 'weekly',
      priority: 0.7
    }
  ];

  const projectRoutes: MetadataRoute.Sitemap = project.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: toDate(page.data.date),
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  const clientWorkRoutes: MetadataRoute.Sitemap = clientWork
    .getPages()
    .map((page) => ({
      url: `${baseUrl}${page.url}`,
      lastModified: toDate(page.data.date),
      changeFrequency: 'monthly',
      priority: 0.6
    }));

  const blogRoutes: MetadataRoute.Sitemap = blog.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: toDate(page.data.date),
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...clientWorkRoutes,
    ...blogRoutes
  ];
}
