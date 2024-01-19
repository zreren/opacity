import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'links',
  title: 'Links',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'string'
    }),
    defineField({
        name: 'fontColor',
        title: 'FontColor',
        type: 'string'
    }),
    defineField({
        name: 'background',
        title: 'Background',
        type: 'string'
    }),
    defineField({
        name: 'href',
        title: 'Href',
        type: 'string'
    })
  ]
})
