import { CollectionConfig } from 'payload';

const ClassroomMembers: CollectionConfig = {
  slug: 'classroomMembers',
  admin: {
    useAsTitle: 'member',
  },
  access: {
    create: ({ req: { user } }) => !!user,
    read: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'members',
      required: true,
    },
    {
      name: 'classroom',
      type: 'relationship',
      relationTo: 'classrooms',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'Teacher', value: 'teacher' },
        { label: 'Student', value: 'student' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        description: 'Status permintaan join (pending / approved / rejected)',
      },
    },
    {
      name: 'joinedAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Tanggal bergabung (saat status approved)',
      },
      hidden: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Cegah duplikasi relasi
        if (operation === 'create') {
          const { member, classroom } = data;
          if (!member || !classroom) return;

          const exists = await req.payload.find({
            collection: 'classroomMembers',
            where: {
              member: {
                equals: member,
              },
              classroom: {
                equals: classroom,
              },
            },
            limit: 1,
            depth: 0,
          });

          if (exists.totalDocs > 0) {
            throw new Error(`Relasi member "${member}" dengan classroom "${classroom}" sudah ada.`);
          }
        }

        // Auto-approve untuk teacher
        if (data.role === 'teacher') {
          data.status = 'approved';
        }

        // Isi joinedAt jika status = approved dan belum diisi
        if (data.status === 'approved' && !data.joinedAt) {
          data.joinedAt = new Date().toISOString();
        }

        return data;
      },
    ],
  },
};

export default ClassroomMembers;
