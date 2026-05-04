import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Depoimento',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Depoimento',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'name', title: 'Nome', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'role', title: 'Cargo', type: 'string' }),
    defineField({ name: 'company', title: 'Empresa', type: 'string' }),
    defineField({ name: 'order', title: 'Ordem de exibição', type: 'number', initialValue: 99 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'company' },
  },
});
