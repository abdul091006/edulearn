"use server"

import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from "@payload-config"
import { Member } from '@/payload-types'

interface LoginParams {
    email: string
    password: string,
}

export interface LoginResponse {
    success: boolean
    error?: string
}

export type LoginResult = {
    exp?: number,
    token?: string,
    user?: Member
}

export async function login({ email, password }: LoginParams): Promise<LoginResponse> {
    const payload = await getPayload({ config: configPromise })
    try{
        const result: LoginResult = await payload.login({
            collection: 'members',
            data: { email, password }
        })

        if (result.token){
            const cookieStore = await cookies()
            cookieStore.set("payload-token", result.token, {
                httpOnly: true,
                path: "/",
            })

            return { success: true }
        } else {
            return { success: false, error: "Invalid email or password" }
        }
    }catch(error){
        console.error("Login error", error)
        return { success: false, error: "An error occured" }
    }
}
