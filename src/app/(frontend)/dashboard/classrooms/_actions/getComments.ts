"use server"

import { getPayload } from 'payload'
import { getUser } from '@/app/(frontend)/_actions/getUser'
import configPromise from '@payload-config'

export default async function getComments() {
  const payload = await getPayload({ config: configPromise })
  const user = await getUser()

  let comments = await payload.find({
    collection: 'comments',
    overrideAccess: false,
    user: user,
  })

  return comments.docs
}
