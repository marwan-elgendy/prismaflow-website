import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'localizedString' }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'localizedString' }),
    defineField({
      name: 'bulletPoints',
      title: 'Bullet Points',
      type: 'array',
      of: [{ type: 'localizedString' }],
    }),
    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'localizedString' }),
  ],
})
