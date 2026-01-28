"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

export default function InfiniteProducts({ initialSlug, initialProducts, limit }) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const searchParams = useSearchParams();
  const loaderRef = useRef(null);

  const fetchProducts = useCallback(
    async (from, to) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("slug", initialSlug);
      params.set("from", from.toString());
      params.set("limit", limit.toString());

      try {
        const response = await fetch(`/api/products?${params.toString()}`);

        if (!response.ok) throw new Error("Ошибка сети");
        const data = await response.json();
        return data || [];
      } catch (error) {
        console.error("Ошибка прокси:", error);
        return [];
      }
    },
    [searchParams, initialSlug, limit],
  );

  useEffect(() => {
    let isMounted = true;
    const refresh = async () => {
      setLoading(true);
      const data = await fetchProducts(0, limit - 1);
      if (isMounted) {
        setProducts(data);
        setHasMore(data.length === limit);
        setLoading(false);
      }
    };
    refresh();
    return () => {
      isMounted = false;
    };
  }, [fetchProducts, limit]);

  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const from = products.length;
    const data = await fetchProducts(from, from + limit - 1);

    if (data.length < limit) {
      setHasMore(false);
    }

    setProducts((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const unique = data.filter((p) => !existingIds.has(p.id));
      return [...prev, ...unique];
    });
    setLoading(false);
  }, [fetchProducts, hasMore, loading, products.length, limit]);

  useEffect(() => {
    const currentLoader = loaderRef.current;
    if (!currentLoader || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMoreProducts();
        }
      },
      { threshold: 0.5, rootMargin: "150px" },
    );

    observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [loadMoreProducts, hasMore, loading]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 border-t border-l border-gray-100">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Изменили h-32 на min-h-[100px], убрали mt-10 */}
      <div ref={loaderRef} className="min-h-25 w-full flex justify-center items-center">
        {loading && (
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-[#003366] border-t-transparent rounded-full animate-spin"></div>
            {/* <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              Загрузка...
            </span> */}
          </div>
        )}
        {!hasMore && products.length > 0 && (
          <p className="text-[10px] text-gray-300 uppercase tracking-widest">
            — Это все товары в данной категории —
          </p>
        )}
      </div>
    </>
  );
}
