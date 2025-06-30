import { CollectionConfig } from 'payload';

const Materials: CollectionConfig = {
  slug: 'materials',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'classroom',
      type: 'relationship',
      relationTo: 'classrooms',
      required: true,
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'members',
      required: true,
      filterOptions: async ({ data, req }) => {
        if (!data?.classroom) return false;

        const res = await req.payload.find({
          collection: 'classroomMembers',
          where: {
            and: [
              { classroom: { equals: data.classroom } },
              { role: { equals: 'teacher' } },
              { status: { equals: 'approved' } },
            ],
          },
          depth: 0,
        });

        return {
          id: {
            in: res.docs.map((d) => d.member),
          },
        };
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' || operation === 'update') {
          const { classroom, createdBy } = data;

          if (!classroom || !createdBy) {
            throw new Error(`Field "classroom" dan "createdBy" wajib diisi.`);
          }

          const relasi = await req.payload.find({
            collection: 'classroomMembers',
            where: {
              member: { equals: createdBy },
              classroom: { equals: classroom },
              role: { equals: 'teacher' },
              status: { equals: 'approved' },
            },
            limit: 1,
            depth: 0,
          });

          if (relasi.totalDocs === 0) {
            throw new Error('Hanya teacher dari kelas yang bisa membuat materi.');
          }
        }
      },
    ],
  },
};

export default Materials;
