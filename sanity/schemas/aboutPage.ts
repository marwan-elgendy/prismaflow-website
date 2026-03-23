import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'localizedString' }),
    defineField({ name: 'heroSubtext', title: 'Hero Subtext', type: 'localizedString' }),
    defineField({ name: 'storyHeadline', title: 'Story Headline', type: 'localizedString' }),
    defineField({ name: 'storyBody', title: 'Story Body', type: 'localizedString' }),
    defineField({ name: 'philosophyQuote', title: 'Philosophy Quote', type: 'localizedString' }),
    defineField({ name: 'philosophyCTA', title: 'Philosophy CTA', type: 'localizedString' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
})
