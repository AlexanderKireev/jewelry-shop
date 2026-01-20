'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, X, ArrowLeft } from 'lucide-react'

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState('login') // 'login', 'signup', 'reset'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  // Функция для открытия/закрытия, которая всегда сбрасывает на логин
  const toggleModal = (state) => {
    setIsOpen(state)
    if (state === true) {
      setMode('login')
      setMessage('')
      setEmail('')
      setPassword('')
      setNickname('')
    }
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        toggleModal(false)
        router.refresh()
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { 
            emailRedirectTo: `${window.location.origin}/auth/confirm`,
            data: { display_name: nickname } 
          },
        })
        if (error) throw error
        setMessage('Успех! Проверьте почту для подтверждения регистрации.')
      } else if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        })
        if (error) throw error
        setMessage('Ссылка для восстановления отправлена на ваш Email.')
      }
    } catch (error) {
      setMessage(`Ошибка: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return (
    <button 
      onClick={() => toggleModal(true)} 
      className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-2xl font-medium transition-all shadow-xl shadow-gray-200"
    >
      Войти
    </button>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={() => toggleModal(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-white p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
        <button 
          onClick={() => toggleModal(false)} 
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {mode === 'reset' && !message && (
          <button 
            onClick={() => setMode('login')} 
            className="absolute left-4 top-4 text-gray-400 hover:text-gray-600 flex items-center text-xs"
          >
            <ArrowLeft size={16} className="mr-1" /> Назад
          </button>
        )}

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          {mode === 'login' ? 'С возвращением' : mode === 'signup' ? 'Создать аккаунт' : 'Восстановление'}
        </h2>

        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          {/* Скрываем инпуты, если показано сообщение об успехе при регистрации/сбросе */}
          {!message ? (
            <>
              {mode === 'signup' && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Никнейм</label>
                  <input required className="w-full mt-1 border p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Ваше имя" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input required className="w-full mt-1 border p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" type="email" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              {mode !== 'reset' && (
                <div>
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">Пароль</label>
                    {mode === 'login' && (
                      <button type="button" onClick={() => setMode('reset')} className="text-[11px] text-blue-600 hover:underline">Забыли пароль?</button>
                    )}
                  </div>
                  <div className="relative mt-1">
                    <input required className="w-full border p-2.5 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              )}

              <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white font-semibold p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-100 mt-2">
                {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : mode === 'signup' ? 'Зарегистрироваться' : 'Отправить ссылку'}
              </button>
            </>
          ) : (
            /* Блок сообщения об успехе */
            <div className="py-4 text-center">
              <div className="bg-green-50 text-green-700 p-4 rounded-2xl text-sm mb-4">
                {message}
              </div>
              <button 
                type="button"
                onClick={() => toggleModal(false)}
                className="text-blue-600 font-medium hover:underline"
              >
                Понятно, закрыть
              </button>
            </div>
          )}

          {/* Переключатель режимов (скрыт, если есть сообщение об успехе) */}
          {!message && (
            <button 
              type="button" 
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage('') }} 
              className="w-full text-sm text-gray-500 hover:text-gray-700 mt-2"
            >
              {mode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
