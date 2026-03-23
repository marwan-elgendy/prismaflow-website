import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'ar', title: 'Arabic', type: 'array', of: [{ type: 'block' }] }),
  ],
})
