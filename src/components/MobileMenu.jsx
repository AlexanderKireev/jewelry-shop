'use client'

import { useState } from 'react'
import { Menu, X, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { menuItems } from '@/lib/menuData'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-0 text-white hover:text-amber-500 transition-colors"
      >
        <Menu size={28} />
      </button>

      {/* Оверлей и панель меню */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex">
          {/* Затемнение фона */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Сама панель меню */}
          <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <span className="font-serif font-bold text-xl uppercase tracking-widest">Меню</span>
              <button onClick={() => setIsOpen(false)} className="text-gray-400">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              <nav className="space-y-8">
                {menuItems.map((item) => (
                  <div key={item.slug} className="space-y-4">
                    <Link 
                      href={`/catalog/${item.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-bold text-gray-900 block border-l-4 border-amber-500 pl-4"
                    >
                      {item.name}
                    </Link>
                    
                    <div className="grid grid-cols-1 gap-3 pl-5">
                      {item.subcategories?.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/catalog/${sub.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="text-gray-500 hover:text-amber-600 flex justify-between items-center text-sm"
                        >
                          {sub.name} <ChevronRight size={14} className="text-gray-300" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Chisinau | 2026</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
