'use client'
import { useCartStore } from '@/lib/store'
import { useEffect, useState } from 'react'

export default function CartCounter() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);

  // Чтобы избежать ошибок гидратации в Next.js 15+
  useEffect(() => { setMounted(true) }, []);

  if (!mounted || cartItems.length === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
      {cartItems.length}
    </span>
  );
}
