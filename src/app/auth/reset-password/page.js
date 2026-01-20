'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setMessage(`Ошибка: ${error.message}`)
    } else {
      setMessage('Пароль успешно обновлен!')
      setTimeout(() => {
        router.push('/')
        router.refresh()
      }, 2000)
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Новый пароль</h1>
        
        <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 block mb-1">Придумайте новый пароль</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {message && (
            <div className={`p-3 rounded-xl text-sm ${message.includes('Ошибка') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {message}
            </div>
          )}

          <button 
            disabled={loading} 
            className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 shadow-lg shadow-blue-100 transition-all mt-2"
          >
            {loading ? 'Обновление...' : 'Сохранить пароль'}
          </button>
        </form>
      </div>
    </div>
  )
}
