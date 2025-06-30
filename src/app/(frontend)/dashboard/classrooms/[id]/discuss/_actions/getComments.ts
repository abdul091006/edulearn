"use server"
import { Comment } from '@/payload-types';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function getComments(classroomId: string): Promise<Comment[]> {
    const payload = await getPayload({ config: configPromise })

  const response = await payload.find({
    collection: 'comments',
    where: {
      classroom: { equals: classroomId },
    },
    sort: 'createdAt',
    depth: 2,
    limit: 100,
  });
  return response.docs;
}