import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'applyPage',
  title: 'Apply Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'localizedString' }),
    defineField({ name: 'exclusionText', title: 'Exclusion Text', type: 'localizedString' }),
    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'localizedString' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
})
