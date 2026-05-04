import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'bralarmseg',
  title: 'BRALARMSEG — CMS',
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            S.listItem()
              .title('Configurações do Site')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.documentTypeListItem('product').title('Produtos'),
            S.documentTypeListItem('testimonial').title('Depoimentos'),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
