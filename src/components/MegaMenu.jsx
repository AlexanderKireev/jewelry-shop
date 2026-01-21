'use client'

import { useState } from 'react';
import Link from 'next/link';
import { menuItems } from '@/lib/menuData';

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <nav className="bg-white border-b border-gray-100 hidden md:block relative z-40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Основная строка категорий */}
        <div className="flex justify-center space-x-12 py-4">
          {menuItems.map((item) => (
            <div
              key={item.slug}
              onMouseEnter={() => setActiveMenu(item.slug)}
              className="static"
            >
              <Link
                href={`/catalog/${item.slug}`}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeMenu === item.slug ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'
                }`}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Выпадающая подстрока (Mega Menu Row) */}
      <div 
        className={`absolute left-0 w-full bg-gray-50 border-b border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${
          activeMenu ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-center gap-10">
            {menuItems.find(i => i.slug === activeMenu)?.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/catalog/${sub.slug}`}
                className="text-xs font-medium text-gray-500 hover:text-amber-600 transition-colors uppercase tracking-wider"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
