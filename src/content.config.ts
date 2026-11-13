import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Esquema flexible: compatible con las notas que publica la Central Editorial.
const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    excerpt: z.string().optional(),
    category: z.string().default('Noticias Locales'),
    image: z.string().default('/logo.png'),
    imageCaption: z.string().optional(),
    author: z.string().default('Redacción Mayaik Noticias'),
    pubDate: z.coerce.date(),
    featured: z.boolean().default(false),
    breaking: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    oldSlug: z.string().optional(), // dirección que tenía la nota en el WordPress anterior
  }),
});

export const collections = { noticias };
