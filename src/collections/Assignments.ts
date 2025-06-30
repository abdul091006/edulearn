import { CollectionConfig } from 'payload';

const Assignments: CollectionConfig = {
  slug: 'assignments',
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'dueDate',
      type: 'date',
      required: true,
    },
    {
      name: 'isCompleted',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        hidden: true,
      },
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
        // Hanya jalankan validasi saat create atau update
        if (operation === 'create' || operation === 'update') {
          const { classroom, createdBy } = data;

          // Pastikan kedua field terpenuhi
          if (!classroom || !createdBy) {
            throw new Error(`Field "classroom" dan "createdBy" wajib diisi.`);
          }

          // Cari di collection "classroomMembers" apakah ada baris yang:
          // member === createdBy, classroom === classroom, role === 'teacher'
          const relasi = await req.payload.find({
            collection: 'classroomMembers',
            where: {
              member: {
                equals: createdBy,
              },
              classroom: {
                equals: classroom,
              },
              role: {
                equals: 'teacher',
              },
            },
            limit: 1,
            depth: 0,
          });

          if (relasi.totalDocs === 0) {
            throw new Error(
              'Hanya pengguna dengan role "teacher" di kelas tersebut yang dapat membuat assignment.'
            );
          }
        }
      },
    ],
  },
};

export default Assignments;
