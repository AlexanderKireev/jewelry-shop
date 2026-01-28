import { createServerSide } from "@/lib/supabaseServer";
import InfiniteProducts from "@/components/InfiniteProducts";
import FilterDrawer from "@/components/FilterDrawer";
import DynamicFilters from "@/components/DynamicFilters";
import { Suspense } from "react";
import { getCategoryBySlug } from "@/lib/menuData";

export default async function CatalogPage({ params, searchParams }) {
  const { slug } = await params;
  const sParams = await searchParams;
  const category = getCategoryBySlug(slug);

  const pageTitle = category?.title || category?.name || slug;
  const supabase = await createServerSide();

  const LIMIT = 8;

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .or(`category_slug.eq.${slug},sub_category_slug.eq.${slug}`);

     // 2. ФИЛЬТРАЦИЯ ПО ТИПУ ИЗДЕЛИЯ (Те самые чекбоксы подкатегорий)
  if (sParams.sub_category_slug) {
    const subSlugs = Array.isArray(sParams.sub_category_slug) 
      ? sParams.sub_category_slug 
      : [sParams.sub_category_slug];
    query = query.in("sub_category_slug", subSlugs);
  }

  if (sParams.min_price) query = query.gte("price", sParams.min_price);
  if (sParams.max_price) query = query.lte("price", sParams.max_price);

  // 4. Динамические фильтры (размеры, камни и т.д.)
  if (category && category.filters) {
    category.filters.forEach((filter) => {
      const value = sParams[filter.id];
      if (value) {
        const valuesArray = Array.isArray(value) ? value : [value];
        query = query.in(filter.id, valuesArray);
      }
    });
  }


  const { data: initialProducts, count } = await query
    .order("created_at", { ascending: false })
    .order("id", { ascending: true })
    .range(0, LIMIT - 1);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-0">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="hidden md:block w-62.5 shrink-0">
          <div className="sticky top-32">
            <Suspense fallback={<div>Загрузка фильтров...</div>}>
              <DynamicFilters categorySlug={slug} />
            </Suspense>
          </div>
        </aside>

        <section className="grow">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{pageTitle}</h1>
              <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-widest font-bold">
                Найдено товаров: {count || 0}
              </p>
            </div>

            <FilterDrawer>
              <div className="py-4 text-left">
                <Suspense>
                  <DynamicFilters categorySlug={slug} />
                </Suspense>
              </div>
            </FilterDrawer>
          </div>

          <Suspense fallback={<div className="grid grid-cols-3 gap-10">...</div>}>
            <InfiniteProducts
              initialSlug={slug}
              initialProducts={initialProducts || []}
              limit={LIMIT}
              currentFilters={sParams}
            />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
