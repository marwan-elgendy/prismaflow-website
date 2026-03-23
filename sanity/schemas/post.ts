import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localizedString', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'localizedString' }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'localizedString' })],
    }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'author', title: 'Author', type: 'localizedString' }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] }),
        defineField({ name: 'ar', title: 'Arabic', type: 'array', of: [{ type: 'block' }] }),
      ],
    }),
    defineField({ name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
})
