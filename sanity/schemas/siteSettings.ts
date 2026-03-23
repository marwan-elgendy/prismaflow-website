import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'localizedString' }),
    defineField({ name: 'logoUrl', title: 'Logo URL', type: 'string' }),
    defineField({
      name: 'navLinks',
      title: 'Nav Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'localizedString' }),
          defineField({ name: 'href', type: 'string' }),
        ],
      }],
    }),
    defineField({ name: 'footerText', title: 'Footer Text', type: 'localizedString' }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', type: 'string' }),
        defineField({ name: 'linkedin', type: 'string' }),
        defineField({ name: 'facebook', type: 'string' }),
        defineField({ name: 'whatsapp', type: 'string' }),
      ],
    }),
  ],
})
