'use client'
import { createClientSide } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClientSide()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.refresh() // Обновляет серверные данные в Header
    }
  }

  return (
    <button 
      onClick={handleLogout}
      className="text-[10px] cursor-pointer uppercase font-bold tracking-wider text-red-400 hover:text-red-600 transition-colors"
    >
      Выйти
    </button>
  )
}
