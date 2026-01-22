"use client";

import { useState } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import LogoutButton from './LogoutButton';

export default function UserProfile({ user, navLinkStyle, labelStyle }) {
  const [isOpen, setIsOpen] = useState(false);

  const displayName = user.user_metadata?.display_name || user.email?.split('@')[0];

  return (
    <div className="relative">
      {/* Кнопка-триггер */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={navLinkStyle}
      >
        <User size={22} strokeWidth={1.5} />
        <span className={`${labelStyle} max-w-20 truncate`}>
          {displayName}
        </span>
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <>
          {/* Фон для закрытия при клике вне меню */}
          <div 
            className="fixed inset-0 z-90" 
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="absolute right-[-70px] mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] py-2 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
      
      
          {/* <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 z-20 py-2 animate-in fade-in zoom-in-95 duration-100 origin-top-right"> */}
            <div className="px-4 py-2 border-b border-gray-50">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider text-center">Никнейм</p>
              <p className="text-sm font-semibold text-gray-900 truncate text-center">{displayName}</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider text-center">Аккаунт</p>
              <p className="text-sm font-semibold text-gray-900 truncate text-center">{user.email}</p>
            </div>

            {/* <Link 
              href="/profile" 
              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Личный кабинет
            </Link> */}

            <div className="px-2 pt-1 flex justify-center">
              <LogoutButton /> 
            </div>
          </div>
        </>
      )}
    </div>
  );
}
