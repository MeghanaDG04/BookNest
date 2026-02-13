import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  const redirectTo = request.nextUrl.clone()
  redirectTo.searchParams.delete('code')
  redirectTo.searchParams.delete('next')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Log Google sign-in event
      await supabase.from("auth_logs").insert({
        user_id: data.user.id,
        email: data.user.email,
        event: "google_login",
      })

      redirectTo.pathname = next
      return NextResponse.redirect(redirectTo)
    }
  }

  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}
