import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 }),
    defineField({ name: 'ogImage', title: 'OG Image', type: 'image', options: { hotspot: true } }),
  ],
})
