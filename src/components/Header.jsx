// src/components/Header.js
import { createServerSide } from "@/lib/supabaseServer";
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import AuthModal from './AuthModal';
import MegaMenu from './MegaMenu';
import CartCounter from './CartCounter';
import MobileMenu from './MobileMenu'; // Импортируем новый компонент бургера

export default async function Header() {
  const supabase = await createServerSide();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 shadow-sm bg-white">
      <div className="border-b border-gray-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* БУРГЕР: Виден только на мобильных (md:hidden) */}
          <div className="md:hidden">
            <MobileMenu />
          </div>

          <Link href="/" className="group">
            <h1 className="text-xl md:text-3xl font-serif font-bold text-gray-900 tracking-tighter">
              GOLD & SILVER <span className="text-amber-500">💍</span>
            </h1>
          </Link>

          <div className="flex items-center gap-2 md:gap-6">
            {user ? (
              <div className="flex items-center gap-2 md:gap-4 bg-gray-50 p-1.5 md:pl-4 rounded-full border border-gray-100">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-[9px] uppercase text-gray-400 font-bold">Клиент</span>
                  <span className="text-xs font-semibold text-gray-700">{user.email}</span>
                </div>
                <LogoutButton />
                <Link href="/cart" className="relative bg-gray-900 text-white p-2.5 rounded-full hover:bg-amber-600 transition-all">
                  🛒 <CartCounter />
                </Link>
              </div>
            ) : (
              <AuthModal />
            )}
          </div>
        </div>
      </div>

      {/* MegaMenu остается: оно само скрывается на мобильных (в нем есть hidden md:block) */}
      <MegaMenu />
    </header>
  );
}
