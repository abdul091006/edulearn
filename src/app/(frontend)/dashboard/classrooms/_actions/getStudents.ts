import { getUser } from '@/app/(frontend)/_actions/getUser'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function getStudents({ id }: { id: string }) {
  const payload = await getPayload({ config: configPromise });
  const user = await getUser();

  // Cari classroomMembers yang classroom = id, role = student, status = approved
  const classroomMembers = await payload.find({
    collection: 'classroomMembers',
    where: {
      classroom: {
        equals: id,
      },
      role: {
        equals: 'student',
      },
      status: {
        equals: 'approved',
      },
    },
    depth: 1, // agar field member (relasi ke members) ikut terisi
    overrideAccess: false,
    user: user,
  });

  // Ambil array member dari hasil query
  const students = classroomMembers.docs.map((cm: any) => cm.member);
  return students;
}
