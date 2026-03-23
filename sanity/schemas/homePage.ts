import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'headline', type: 'localizedString' }),
        defineField({ name: 'subheadline', type: 'localizedString' }),
        defineField({ name: 'primaryCTA', type: 'localizedString' }),
        defineField({ name: 'secondaryCTA', type: 'localizedString' }),
      ],
    }),
    defineField({
      name: 'problemSection',
      title: 'Problem Section',
      type: 'object',
      fields: [
        defineField({ name: 'headline', type: 'localizedString' }),
        defineField({ name: 'body', type: 'localizedString' }),
      ],
    }),
    defineField({
      name: 'processSection',
      title: 'Process Section',
      type: 'object',
      fields: [
        defineField({ name: 'headline', type: 'localizedString' }),
        defineField({
          name: 'steps',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'number', type: 'string' }),
              defineField({ name: 'title', type: 'localizedString' }),
              defineField({ name: 'description', type: 'localizedString' }),
            ],
          }],
        }),
      ],
    }),
    defineField({
      name: 'socialProof',
      title: 'Social Proof',
      type: 'object',
      fields: [
        defineField({ name: 'headline', type: 'localizedString' }),
        defineField({
          name: 'testimonials',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
        }),
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
})
