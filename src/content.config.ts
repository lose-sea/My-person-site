import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['c-lang', 'oc-ios', 'python']),
    categoryLabel: z.string(),
    subTag: z.string(),
    date: z.string(),
    readTime: z.string(),
    summary: z.string(),
    csdnUrl: z.string().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = { notes };
