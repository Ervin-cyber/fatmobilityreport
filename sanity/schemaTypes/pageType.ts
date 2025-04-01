import {defineField, defineType} from 'sanity'

export const pageType = defineType({//page schema type
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'type',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'order',
        type: 'number',
        validation: (rule) => rule.required().min(1),
      }),
    ],
  })