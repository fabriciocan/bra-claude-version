import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Produto',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'Nome Completo',
      type: 'string',
      description: 'Ex: Luminária Highbay Magna',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Highbay', value: 'Highbay' },
          { title: 'Projetor UFO', value: 'Projetor UFO' },
          { title: 'Projetor', value: 'Projetor' },
          { title: 'Emergência', value: 'Emergência' },
          { title: 'Uso Externo', value: 'Uso Externo' },
          { title: 'Uso Interno', value: 'Uso Interno' },
          { title: 'Sinalização', value: 'Sinalização' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productLine',
      title: 'Linha de Produto',
      type: 'string',
      options: {
        list: [
          { title: 'LED', value: 'led' },
          { title: 'Emergência', value: 'emergencia' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagem do Produto',
      type: 'image',
      options: { hotspot: true },
      description: 'Faça upload da imagem. Se não tiver, use o campo de URL externo abaixo.',
    }),
    defineField({
      name: 'imageUrl',
      title: 'URL da Imagem (externo)',
      type: 'url',
      description: 'URL alternativa para a imagem (usado quando não há imagem em upload)',
    }),
    defineField({
      name: 'shortDesc',
      title: 'Descrição Curta',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'longDesc',
      title: 'Descrição Longa',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'badge',
      title: 'Badge / Etiqueta',
      type: 'string',
      description: 'Ex: Mais vendido, Alta eficiência, IP65, 24Vdc, Emergência, IR',
    }),
    defineField({
      name: 'badgeColor',
      title: 'Cor do Badge',
      type: 'string',
      options: {
        list: [
          { title: 'Laranja — Destaque/Mais vendido', value: '#E35106' },
          { title: 'Azul — Certificação/Técnico', value: '#003DA5' },
          { title: 'Verde — Alta eficiência', value: '#1A8A4A' },
          { title: 'Vermelho — Emergência', value: '#DC2626' },
          { title: 'Roxo — Infravermelho IR', value: '#5A3A8A' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'specs',
      title: 'Especificações Técnicas',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'spec',
          fields: [
            { name: 'key', title: 'Especificação', type: 'string' },
            { name: 'value', title: 'Valor', type: 'string' },
          ],
          preview: {
            select: { title: 'key', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'applications',
      title: 'Aplicações',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ex: Galpões industriais, Frigoríficos, Centros logísticos',
    }),
    defineField({
      name: 'certifications',
      title: 'Certificações',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ex: INMETRO, IP66, CE, RoHS',
    }),
    defineField({
      name: 'downloads',
      title: 'Downloads',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'download',
          fields: [
            { name: 'name', title: 'Nome', type: 'string' },
            { name: 'type', title: 'Tipo', type: 'string', initialValue: 'PDF' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'url' },
          },
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Produto em Destaque',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordem de exibição',
      type: 'number',
      initialValue: 99,
      description: 'Menor número = aparece primeiro',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
  orderings: [
    { title: 'Ordem de exibição', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Nome A–Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
    { title: 'Categoria', name: 'categoryAsc', by: [{ field: 'category', direction: 'asc' }] },
  ],
});
