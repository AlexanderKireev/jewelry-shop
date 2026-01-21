'use client'
import { menuItems } from '@/lib/menuData';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function DynamicFilters({ categorySlug }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Флаг для блокировки авто-обновления URL во время полного сброса
  const isResetting = useRef(false);

  // Локальные состояния для полей цены
  const [minPrice, setMinPrice] = useState(searchParams.get('min_price') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('max_price') || '');

  // 1. Синхронизация инпутов с URL (нужна для кнопки "Назад" и сброса)
  useEffect(() => {
    const urlMin = searchParams.get('min_price') || '';
    const urlMax = searchParams.get('max_price') || '';
    
    if (urlMin !== minPrice) setMinPrice(urlMin);
    if (urlMax !== maxPrice) setMaxPrice(urlMax);
  }, [searchParams]);

  // 2. Эффект для записи цены в URL (Debounce 600ms)
  useEffect(() => {
    // Если нажат "Сброс", не записываем старые значения обратно в URL
    if (isResetting.current) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const currentUrlMin = params.get('min_price') || '';
      const currentUrlMax = params.get('max_price') || '';

      // Обновляем только если есть реальные изменения
      if (minPrice !== currentUrlMin || maxPrice !== currentUrlMax) {
        if (minPrice) params.set('min_price', minPrice); else params.delete('min_price');
        if (maxPrice) params.set('max_price', maxPrice); else params.delete('max_price');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, pathname, router, searchParams]);

  // 3. Логика для чекбоксов
  const handleFilterChange = (filterId, value) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(filterId);

    if (currentValues.includes(value)) {
      const newValues = currentValues.filter(v => v !== value);
      params.delete(filterId);
      newValues.forEach(v => params.append(filterId, v));
    } else {
      params.append(filterId, value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // 4. Функция полного сброса
  const handleReset = () => {
    isResetting.current = true; // Включаем блокировку
    setMinPrice('');
    setMaxPrice('');
    
    // Очищаем URL полностью
    router.push(pathname, { scroll: false });

    // Выключаем блокировку после того как debounce таймер гарантированно прошел
    setTimeout(() => {
      isResetting.current = false;
    }, 800);
  };

  // Ищем данные текущей категории в menuData
  let activeSub = null;
  menuItems.forEach(item => {
    const found = item.subcategories?.find(sub => sub.slug === categorySlug);
    if (found) activeSub = found;
  });

  const hasFilters = searchParams.toString().length > 0;

  // Если подкатегория не выбрана
  if (!activeSub || !activeSub.filters) {
    return (
      <div className="bg-gray-50/50 rounded-2xl p-6 border border-dashed border-gray-200">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 text-center">
          Подбор изделий
        </h3>
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Выберите конкретный раздел для фильтрации
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* КНОПКА СБРОСА */}
      {hasFilters && (
        <button
          onClick={handleReset}
          className="w-full py-2.5 text-[10px] font-bold uppercase tracking-widest text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-xl transition-all border border-amber-100"
        >
          Очистить все фильтры ×
        </button>
      )}

      {/* БЛОК ЦЕНЫ */}
      <div className="border-b border-gray-50 pb-8">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
          Цена, ₽
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="От"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-lg py-2 px-3 text-sm focus:ring-1 focus:ring-amber-500 placeholder:text-gray-300"
          />
          <div className="w-2 h-px bg-gray-300 shrink-0" />
          <input
            type="number"
            placeholder="До"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-lg py-2 px-3 text-sm focus:ring-1 focus:ring-amber-500 placeholder:text-gray-300"
          />
        </div>
      </div>

      {/* ДИНАМИЧЕСКИЕ СПИСКИ ИЗ MENUDATA */}
      {activeSub.filters.map((filter) => (
        <div key={filter.id} className="border-b border-gray-50 pb-6 last:border-0">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
            {filter.label}
          </h3>
          <div className="flex flex-col gap-3">
            {filter.options.map((option) => (
              <label key={option} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={searchParams.getAll(filter.id).includes(option)}
                  onChange={() => handleFilterChange(filter.id, option)}
                  className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 transition-all" 
                />
                <span className="group-hover:text-gray-900 transition-colors peer-checked:font-medium">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
