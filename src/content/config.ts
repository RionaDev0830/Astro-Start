import { defineCollection, z } from "astro:content";

const seoSchema = z
  .object({
    page_description: z.string().nullable(),
    canonical_url: z.string().nullable(),
    featured_image: z.string().nullable(),
    featured_image_alt: z.string().nullable(),
    author_twitter_handle: z.string().nullable(),
    open_graph_type: z.string().nullable(),
    no_index: z.boolean(),
  })
  .optional();

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    post_hero: z.object({
      date: z.string().or(z.date()),
      heading: z.string(),
      tags: z.array(z.string()),
      author: z.string(),
      image: z.string(),
      image_alt: z.string(),
    }),
    thumb_image_path: z.string(),
    thumb_image_alt: z.string(),
    seo: seoSchema,
  }),
});
const pageSeo = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  openGraph: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    type: z.string(),
    images: z.object({
      url: z.string().url(),
    }),
  }),
  canonical: z.string().url(),
  metadatabase: z.string().url(),
})
const pageSchema = z.object({
  title: z.string(),
  content_blocks: z.array(z.any()),
  seo: pageSeo,
});

const paginatedCollectionSchema = z.object({
  title: z.string(),
  page_size: z.number().positive(),
  seo: pageSeo,
});

const pagesCollection = defineCollection({
  schema: z.union([paginatedCollectionSchema, pageSchema]),
});

export const collections = {
  blog: blogCollection,
  pages: pagesCollection,
};
