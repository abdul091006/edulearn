"use server"

import { getPayload } from "payload"
import { cookies } from "next/headers"
import configPromise from "@payload-config"
import { Member } from "@/payload-types"

interface RegisterParams {
    name: string
    email: string
    password: string
}

export interface RegisterResponse {
    success: boolean
    error?: string
}

export default async function Register({ name, email, password }: RegisterParams) {
  const payload = await getPayload({ config: configPromise })

  try{
    await payload.create({
      collection: 'members',
      data: { name, email, password }
    })

    return { success: true }
  }catch(error){
    return { success: false, error: "Register failed" }
  }
}
