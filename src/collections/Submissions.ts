import { CollectionConfig } from 'payload';

const Submissions: CollectionConfig = {
  slug: 'submissions',
  fields: [
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
      required: true,
      admin: {
        condition: (data) => Boolean(data.classroom),
      },
      filterOptions: ({ data }) => {
        if (!data?.classroom) return false;

        return {
          classroom: {
            equals: data.classroom,
          },
        };
      },
    },
    {
      name: 'student',
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
              { role: { equals: 'student' } },
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
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'grade',
      type: 'number',
      required: false,
    },
    {
      name: 'feedback',
      type: 'textarea',
    },
    {
      name: 'gradedBy',
      type: 'relationship',
      relationTo: 'members',
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
    {
      name: 'gradedAt',
      type: 'date',
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, originalDoc, req }) => {
        const { classroom, student, gradedBy, grade } = data;
        const payload = req.payload;

        // Ambil classroomMembers yang approved
        const classroomMembers = await payload.find({
          collection: 'classroomMembers',
          where: {
            and: [
              { classroom: { equals: classroom } },
              { status: { equals: 'approved' } },
            ],
          },
          depth: 0,
        });

        // Validasi student
        const isValidStudent = classroomMembers.docs.some(
          (m) => m.member === student && m.role === 'student'
        );
        if (!isValidStudent) {
          throw new Error('Selected user is not an approved student in this class.');
        }

        // Validasi gradedBy (jika ada)
        if (gradedBy) {
          const isValidTeacher = classroomMembers.docs.some(
            (m) => m.member === gradedBy && m.role === 'teacher'
          );
          if (!isValidTeacher) {
            throw new Error('Selected grader is not an approved teacher in this class.');
          }
        }

        // Jika ada nilai, maka gradedBy harus diisi
        if (typeof grade === 'number' && !gradedBy) {
          throw new Error('Teacher (gradedBy) must be set when assigning a grade.');
        }

        // Atur gradedAt
        if (originalDoc?.gradedAt) {
          data.gradedAt = originalDoc.gradedAt;
        } else {
          const isNewGradeProvided = typeof grade === 'number';
          const hadGradeBefore = typeof originalDoc?.grade === 'number';

          if (isNewGradeProvided && !hadGradeBefore) {
            data.gradedAt = new Date().toISOString();
          } else {
            data.gradedAt = undefined;
          }
        }

        return data;
      },
    ],
  },
};

export default Submissions;
