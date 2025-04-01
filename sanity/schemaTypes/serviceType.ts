import {defineField, defineType} from 'sanity'
import { client } from "../client";

export const serviceType = defineType({//service schema type
    name: 'service',
    title: 'Service',
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
        validation: (Rule) =>
            Rule.custom(async (slug, context) => {
              if (!slug?.current) return "Slug is required";
              if (!context?.document) return true;
    
              const currentId = context.document._id.replace(/^drafts\./, ""); // Normalize ID to match published version

              const query = `*[
                _type in ["category", "service"] 
                && slug.current == $slug 
                && _id != $id 
                && _id != "drafts." + $id
              ][0]`; // Exclude both draft and published versions
        
              const params = {
                slug: slug.current,
                id: currentId, // Ensure we compare correctly
              };

              // Query to check if the slug exists in multiple document types
              /*const query = `*[_type in ["category", "service"] && slug.current == $slug && _id != $id][0]`;
              const params = { slug: slug.current, id: context.document._id };*/
        
              const existingDoc = await client.fetch(query, params);
              return existingDoc ? "Slug must be unique across services and categories" : true;
            }),
      }),
      defineField({
        name: 'show_on_navigation_bar',
        title: 'Show on navigation bar',
        type: 'boolean',
        initialValue: true,
      }),
      defineField({
        name: 'order',
        type: 'number',
        validation: (rule) => rule.required().min(1),
      }),
      defineField({
        name: 'body',
        type: 'array',
        of: [        
          { type: "block" }, // Block type for regular text (paragraphs, headings, etc.)
          { type: "image", fields: [
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Description of the image",
            }),
            defineField({
              name: "width",
              type: "string",
              title: "Width (CSS value)",
              description: "Example: '50%' or '300px'",
            }),
            defineField({
              name: "height",
              type: "string",
              title: "Height (CSS value, optional)",
              description: "Example: 'auto' or '200px'",
            }),
          ] }, // Image type for inserting images
          ],
      }),
    ],
  })