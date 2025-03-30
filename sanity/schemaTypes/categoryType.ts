import {defineField, defineType} from 'sanity'

export const categoryType = defineType({//category schema type
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'slug',
        type: 'slug',
        options: {source: 'name'},
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'show_on_navigation_bar',
        title: 'Show on navigation bar',
        type: 'boolean',
        initialValue: true,
      }),
      defineField({
        name: 'description',
        type: 'string',
      }),
      defineField({
        name: 'order',
        type: 'number',
        validation: (rule) => rule.required().min(1),
      }),
    ],
  })