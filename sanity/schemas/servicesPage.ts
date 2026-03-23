import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'localizedString' }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'localizedString' }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', type: 'localizedString' }),
          defineField({ name: 'problem', type: 'localizedString' }),
          defineField({ name: 'solution', type: 'localizedString' }),
          defineField({ name: 'result', type: 'localizedString' }),
          defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
        ],
      }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
})
