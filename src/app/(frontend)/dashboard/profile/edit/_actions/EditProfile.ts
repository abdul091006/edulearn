'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getUser } from '@/app/(frontend)/_actions/getUser'

export async function EditProfile(formData: FormData) {
  const payload = await getPayload({ config: configPromise })
  const user = await getUser()

  if (!user?.id) {
    return { success: false, error: 'User ID is missing' }
  }

  const name = formData.get('name')?.toString() || ''
  const dateOfBirth = formData.get('dateOfBirth')?.toString() || ''
  const genderInput = formData.get('gender')?.toString()?.toLowerCase()
  const gender: 'male' | 'female' | undefined = genderInput && ['male', 'female'].includes(genderInput) ? genderInput as 'male' | 'female' : undefined
  const email = formData.get('email')?.toString() || ''
  const phone = formData.get('phone')?.toString() || ''
  const address = formData.get('address')?.toString() || ''
  const bio = formData.get('bio')?.toString() || ''
  const avatarId = formData.get('avatarId')?.toString()

  try {
    const update = await payload.update({
      collection: 'members',
      id: user.id,
      data: {
        name,
        dateOfBirth,
        gender,
        email,
        phone,
        address,
        bio,
        avatar: avatarId ? Number(avatarId) : undefined,
      },
    })

    console.log('Profile update result:', update)
    return { success: true, data: update }
  } catch (error: any) {
    console.error('Error in EditProfile:', error.message)
    return { success: false, error: error.message }
  }
}