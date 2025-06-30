// src/collections/classrooms.ts
import { CollectionConfig } from 'payload';

const Classrooms: CollectionConfig = {
  slug: 'classrooms',
  auth: false,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Deskripsi singkat mengenai kelas',
      },
    },
    {
      name: 'classCode',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Kode unik yang dipakai user untuk Join Class',
      },
    },
    {
      name: 'requireApproval',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Jika dicentang, setiap permintaan join harus di‐approve teacher',
        position: 'sidebar',
      },
    },
    // Catatan: field "members" dihapus di sini karena kita menggunakan collection pivot "classroomMembers"
  ],
  // Semua hook yang mengelola members/joinedAt/status dipindahkan ke collection pivot
};

export default Classrooms;
