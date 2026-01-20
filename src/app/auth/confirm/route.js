import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  
  // Supabase присылает эти параметры в ссылке из письма
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') // Обычно 'signup' или 'recovery'
  const next = searchParams.get('next') ?? '/'

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next

  if (token_hash && type) {
    const cookieStore = await cookies()
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    // Обмениваем одноразовый хеш на активную JWT сессию
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      // Удаляем параметры из URL, чтобы ссылка выглядела чисто после редиректа
      redirectTo.searchParams.delete('token_hash')
      redirectTo.searchParams.delete('type')
      return NextResponse.redirect(redirectTo)
    }
  }

  // Если токен невалидный или просрочен, отправляем на страницу ошибки
  // Ты можешь создать страницу /auth/auth-code-error или просто редиректить на /login?error=...
  return NextResponse.redirect(new URL('/login?error=auth-code-error', request.url))
}
