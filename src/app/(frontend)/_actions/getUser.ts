"use server"
import { headers as getHeaders } from "next/headers"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import type { Payload } from "payload"

export async function getUser(): Promise<any> {
  const headers = await getHeaders()

  const payload: Payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  return user
}
