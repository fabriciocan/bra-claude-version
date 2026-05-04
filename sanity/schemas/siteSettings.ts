import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    defineField({ name: 'phone1', title: 'WhatsApp / Celular', type: 'string', initialValue: '(41) 99274-4818' }),
    defineField({ name: 'phone2', title: 'Telefone Fixo', type: 'string', initialValue: '(41) 3045-9744' }),
    defineField({ name: 'phone3', title: 'Telefone 3', type: 'string', initialValue: '(41) 4063-5272' }),
    defineField({ name: 'phone4', title: 'Telefone 4 (SP)', type: 'string', initialValue: '(11) 4063-5268' }),
    defineField({ name: 'email', title: 'E-mail', type: 'string', initialValue: 'bra@bralarmseg.com.br' }),
    defineField({
      name: 'address',
      title: 'Endereço',
      type: 'text',
      rows: 2,
      initialValue: 'Rua Des. Antonio de Paula, 3586\nBoqueirão, Curitiba - PR, 81720-280',
    }),
    defineField({ name: 'cnpj', title: 'CNPJ', type: 'string', initialValue: '09.251.362/0001-20' }),
    defineField({
      name: 'whatsapp',
      title: 'Número WhatsApp (somente dígitos)',
      type: 'string',
      initialValue: '5541992744818',
      description: 'Usado no link direto do WhatsApp. Formato: 5541999999999',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Configurações do Site' };
    },
  },
});
