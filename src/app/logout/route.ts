// app/logout/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'))

  // Hapus cookie
  response.cookies.set('payload-token', '', {
    path: '/',
    maxAge: 0,
  })

  return response
}
