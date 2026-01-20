import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import ProductCard from '@/components/ProductCard'
import LogoutButton from '@/components/LogoutButton'
import AuthModal from '@/components/AuthModal'

export default async function Home() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
      },
    }
  )

  const [productsResponse, userResponse] = await Promise.all([
    supabase.from('products').select('*'),
    supabase.auth.getUser(),
  ])

  const products = productsResponse.data
  const user = userResponse.data?.user

  return (
    <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Магазин 2026 🇲🇩</h1>
          <p className="text-gray-500 text-sm">Добро пожаловать в будущее ритейла</p>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 bg-white p-2 pl-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Аккаунт</span>
                <span className="text-sm font-medium text-gray-700">
                  {user.user_metadata?.display_name || user.email}
                </span>
              </div>
              <div className="h-8 w-[1px] bg-gray-100 mx-1"></div>
              <LogoutButton />
              <a href="/cart" className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-colors shadow-lg shadow-blue-100">🛒</a>
            </div>
          ) : (
            <AuthModal />
          )}
        </div>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400">Товары не найдены.</p>
        </div>
      )}
    </main>
  )
}
