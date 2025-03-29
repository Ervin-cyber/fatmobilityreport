import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: ' fatmobilityreport',

  projectId: 't2lmom4m',
  dataset: 'production',

  basePath: '/admin',

  plugins: [structureTool(), visionTool()],
  schema: {
      types: schemaTypes,
  },
})
