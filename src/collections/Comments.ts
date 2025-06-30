import { CollectionConfig } from 'payload'

const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    useAsTitle: 'message',
  },
  fields: [
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'classroomMembers',
      required: true,
    },
    {
      name: 'classroom',
      type: 'relationship',
      relationTo: 'classrooms',
      required: true,
    },
    {
      name: 'assignment',
      type: 'relationship',
      relationTo: 'assignments',
      required: false,
    },
    {
      name: 'material',
      type: 'relationship',
      relationTo: 'materials',
      required: false,
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'comments',
      required: false,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        const { assignment, material, classroom, author } = data

        // Validasi hanya boleh 1 target komentar
        const countTarget = [assignment, material].filter(Boolean).length
        if (countTarget > 1) {
          throw new Error('Comment hanya boleh untuk assignment, material, atau umum (tidak lebih dari satu).')
        }

        // Ambil data author
        const authorData = await req.payload.findByID({
          collection: 'classroomMembers',
          id: author,
        })

        if (!authorData) {
          throw new Error('Author tidak ditemukan.')
        }

        // Ambil ID classroom dari authorData
        const authorClassroomId =
          typeof authorData.classroom === 'object'
            ? authorData.classroom.id
            : authorData.classroom

        // Ambil ID classroom dari input comment
        const currentClassroomId =
          typeof classroom === 'object' ? classroom.id : classroom

        // Bandingkan ID-nya, bukan objek-nya
        if (authorClassroomId !== currentClassroomId) {
          throw new Error('Author tidak tergabung di kelas ini.')
        }

        if (authorData.status !== 'approved') {
          throw new Error('Author belum disetujui di kelas ini.')
        }

        // Tambahkan createdAt jika belum ada
        data.createdAt = new Date().toISOString()

        return data
      },
    ],
  },
}

export default Comments
