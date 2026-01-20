'use client'

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    // Refresh заставит серверные компоненты перерисоваться 
    // и увидеть, что юзера больше нет в куках
    router.refresh()
    // Или можно жестко перенаправить на логин
    // router.push('/login')
  }

  return (
    <button 
      onClick={handleLogout}
      className="text-sm text-red-600 hover:underline"
    >
      Выйти
    </button>
  )
}
