import {defineField, defineType} from 'sanity'

export const authorType = defineType({//author schema type
    name: 'author',
    title: 'Author',
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
        name: 'coverImage',
        type: 'image',
      }),
      defineField({
        name: 'registeredAt',
        type: 'datetime',
        initialValue: () => new Date().toISOString(),
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'description',
        type: 'array',
        of: [        
          { type: "block" }, // Block type for regular text (paragraphs, headings, etc.)
          { type: "image", fields: [{
            name: "caption",
            title: "Caption",
            type: "string",
            description: "Description of the image",
          }] }, // Image type for inserting images
          ],
      }),
    ],
  })