'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createClientSide } from '@/lib/supabaseClient'
import { useSearchParams } from 'next/navigation'
import ProductCard from './ProductCard'

export default function InfiniteProducts({ initialSlug, initialProducts, limit }) {
  const [products, setProducts] = useState(initialProducts)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true) // По умолчанию true для новых фильтров
  
  const searchParams = useSearchParams()
  const loaderRef = useRef(null)
  const supabase = createClientSide()

  // 1. Обернули функцию загрузки в useCallback, чтобы она была стабильной
  const fetchProducts = useCallback(async (from, to) => {
    let query = supabase
      .from('products')
      .select('*')
      .or(`category_slug.eq.${initialSlug},sub_category_slug.eq.${initialSlug}`)

    // Динамическая фильтрация
    searchParams.forEach((value, key) => {
      if (!value) return; // Пропускаем пустые значения

      if (key === 'min_price') {
        query = query.gte('price', Number(value)); 
      } else if (key === 'max_price') {
        query = query.lte('price', Number(value));
      } else {
        const values = searchParams.getAll(key);
        if (values.length > 0) {
          query = query.in(key, values);
        }
      }
    });

    const { data, error } = await query
      .order('created_at', { ascending: false })
      .order('id', { ascending: true })
      .range(from, to)

    if (error) {
      console.error('Supabase Error:', error.message)
      return []
    }
    return data || []
  }, [searchParams, initialSlug, supabase])

  // 2. Эффект ПЕРЕЗАГРУЗКИ (когда меняем фильтры)
  useEffect(() => {
    const refresh = async () => {
      setLoading(true)
      const data = await fetchProducts(0, limit - 1)
      setProducts(data)
      // Если вернулось меньше, чем лимит — значит больше товаров нет
      setHasMore(data.length === limit) 
      setLoading(false)
    }
    refresh()
  }, [fetchProducts, limit])

  // 3. Эффект ПОДГРУЗКИ (бесконечный скролл)
  const loadMoreProducts = async () => {
    if (loading || !hasMore) return
    setLoading(true)

    const from = products.length 
    const to = from + limit - 1
    const data = await fetchProducts(from, to)

    if (data.length < limit) {
      setHasMore(false)
    }
    
    setProducts(prev => {
      const existingIds = new Set(prev.map(p => p.id))
      const unique = data.filter(p => !existingIds.has(p.id))
      return [...prev, ...unique]
    })
    setLoading(false)
  }

  // 4. Наблюдатель за скроллом
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Проверяем: элемент в кадре + мы не грузим сейчас + еще есть что грузить
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreProducts()
        }
      },
      { threshold: 0.1, rootMargin: '100px' } // Начинаем грузить за 100px до конца
    )

    const currentLoader = loaderRef.current
    if (currentLoader) observer.observe(currentLoader)
    
    return () => {
      if (currentLoader) observer.unobserve(currentLoader)
    }
  }, [hasMore, loading, products.length]) // Важные зависимости

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Элемент-триггер для загрузки */}
      <div 
        ref={loaderRef} 
        className="h-20 w-full flex justify-center items-center mt-10"
      >
        {loading && (
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Загрузка...</span>
          </div>
        )}
        {!hasMore && products.length > 0 && (
          <p className="text-[10px] text-gray-300 uppercase tracking-widest">Вы просмотрели все модели</p>
        )}
      </div>

      {!loading && products.length === 0 && (
        <div className="text-center py-20 border rounded-2xl border-dashed border-gray-100">
          <p className="text-gray-400 text-sm">Ничего не найдено</p>
        </div>
      )}
    </>
  )
}
