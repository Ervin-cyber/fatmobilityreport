import {defineField, defineType} from 'sanity'

export const socialPageType = defineType({//social page schema type
    name: 'social-page',
    title: 'Social page',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'url',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'icon',
        type: 'image',
        options: { hotspot : true },
      }),
    ],
  })