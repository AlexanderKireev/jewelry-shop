import { createServerSide } from "@/lib/supabaseServer";
import Link from "next/link";
import Image from "next/image";
import { Package, Heart, ShoppingCart } from "lucide-react"; // Импорт иконок
// import LogoutButton from "./LogoutButton";
import AuthModal from "./AuthModal";
import MegaMenu from "./MegaMenu";
// import CartCounter from "./CartCounter";
import MobileMenu from "./MobileMenu";
import UserProfile from "./UserProfile";

// Вспомогательный компонент для кружочка
function Badge({ count }) {
  if (count <= 0) return null; // Если 0 или меньше, ничего не рисуем
  return (
    <div className="absolute sm:pt-0.5 -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold min-w-4 h-4 flex items-center justify-center rounded-full px-1 border border-[#003366] animate-in zoom-in duration-200">
      {count > 99 ? "99+" : count}
    </div>
  );
}

export default async function Header() {
  const supabase = await createServerSide();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ЗАГЛУШКИ ДЛЯ СЧЕТЧИКОВ (потом замените на реальные данные)
  const ordersCount = 90; // Будет скрыт
  const wishlistCount = 5; // Будет виден
  const cartCount = 10; // Будет виден

  // Общий стиль для ссылок с иконками
  const navLinkStyle =
    "flex flex-col items-center text-white hover:text-amber-400 transition-all group cursor-pointer";
  const labelStyle = "text-[10px] font-medium uppercase tracking-wider mt-1 hidden sm:block";

  return (
    <header className="sticky top-0 z-50 shadow-lg bg-[#003366]">
      {" "}
      {/* Темно-синий фон */}
      <div className="border-b border-white/10 px-6 pt-2 pb-1">
        {/* <div className="max-w-7xl mx-auto flex justify-between items-center"> */}
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* --- ЛЕВАЯ ЧАСТЬ --- */}
          <div className="flex flex-1 items-center gap-2">
            {/* Бургер: виден ТОЛЬКО до sm */}
            <div className="sm:hidden -ml-3 pt-1">
              <MobileMenu />
            </div>

            {/* Квадратный лого: виден ТОЛЬКО до sm */}
            <Link href="/" className="sm:hidden flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={140}
                height={40}
                className="object-contain"
                priority
              />
            </Link>

            {/* Прямоугольный лого: появляется от sm. 
        На экранах lg он скрывается здесь, чтобы «переехать» в центр */}
            <Link href="/" className="hidden sm:flex lg:hidden items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={200}
                height={54}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* --- ЦЕНТРАЛЬНАЯ ЧАСТЬ --- */}
          {/* Появляется только от lg и выше */}
          <div className="hidden lg:flex flex-none justify-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={200}
                height={54}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* --- ПРАВАЯ ЧАСТЬ --- */}
          <div className="flex flex-1 justify-end items-center gap-4 md:gap-7">
            {user ? (
              <UserProfile user={user} navLinkStyle={navLinkStyle} labelStyle={labelStyle} />
            ) : (
              <AuthModal />
            )}
            {/* ЗАКАЗЫ */}
            <Link href="/orders" className={navLinkStyle}>
              <div className="relative">
                <Package size={22} strokeWidth={1.5} />
                <Badge count={ordersCount} />
              </div>
              <span className={labelStyle}>Заказы</span>
            </Link>

            {/* ИЗБРАННОЕ */}
            <Link href="/wishlist" className={navLinkStyle}>
              <div className="relative">
                <Heart size={22} strokeWidth={1.5} />
                <Badge count={wishlistCount} />
              </div>
              <span className={labelStyle}>Избранное</span>
            </Link>

            {/* КОРЗИНА */}
            <Link href="/cart" className={navLinkStyle}>
              <div className="relative">
                <ShoppingCart size={22} strokeWidth={1.5} />
                <Badge count={cartCount} />
              </div>
              <span className={labelStyle}>Корзина</span>
            </Link>

            {/* ВЫХОД (если залогинен) */}
            {/* {user && (
              <div className="border-l border-white/20 pl-2 ml-1 hidden md:block">
                <LogoutButton />
              </div>
            )} */}
          </div>
        </div>
      </div>
      {/* НИЖНЕЕ МЕНЮ (Категории) */}
      <div className="bg-[#002855]">
        {" "}
        {/* Чуть более темный оттенок для контраста */}
        <MegaMenu />
      </div>
    </header>
  );
}
