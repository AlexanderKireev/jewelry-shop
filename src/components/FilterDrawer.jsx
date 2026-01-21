'use client'
import { useState } from 'react'
import { Settings2, X } from 'lucide-react'

export default function FilterDrawer({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="md:hidden flex items-center gap-2 bg-white border p-3 rounded-xl shadow-sm mb-4">
        <Settings2 size={20} /> Фильтры
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-[2rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" onClick={() => setIsOpen(false)} />
            <div className="max-h-[60vh] overflow-y-auto">{children}</div>
          </div>
        </div>
      )}
    </>
  )
}
