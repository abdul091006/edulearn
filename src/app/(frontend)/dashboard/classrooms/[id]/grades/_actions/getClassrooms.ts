"use server"
import { getUser } from '@/app/(frontend)/_actions/getUser'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function getClassrooms() {
  const payload = await getPayload({ config: configPromise })
  const user = await getUser()

  let results = await payload.find({
    collection: 'classrooms',
    overrideAccess: false,
    user: user,
  })

  const classrooms = await Promise.all(
    results.docs.map(async (result) => {
      return {
        label: result.name,
        value: result.name,
      }
    }),
  )

  return classrooms
}
