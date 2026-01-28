export const menuItems = [
  {
    name: "Изделия из золота",
    slug: "zoloto",
    title: "Изделия из золота",
    subcategories: [
      {
        name: "Кольца",
        slug: "koltsa-zoloto",
        title: "Золотые кольца",
        filters: [
          { id: "size", label: "Размер кольца", options: ["16.0", "17.0", "18.0"] },
          { id: "stone", label: "Вставка", options: ["Бриллиант", "Изумруд"] },
        ],
      },
      {
        name: "Серьги",
        slug: "sergi-zoloto",
        title: "Золотые серьги",
        filters: [
          { id: "lock", label: "Тип замка", options: ["Английский", "Гвоздик", "Продевка"] },
          { id: "color", label: "Цвет золота", options: ["Красное", "Белое"] },
          { id: "stone", label: "Вставка", options: ["Бриллиант", "Изумруд"] },
        ],
      },
    ],
  },
  {
    name: "Изделия из серебра",
    slug: "serebro",
    title: "Изделия из серебра",
    subcategories: [
      {
        name: "Цепочки",
        slug: "tsepochki-serebro",
        title: "Серебряные цепочки",
        filters: [
          { id: "length", label: "Длина (см)", options: ["40", "45", "50", "60"] },
          { id: "weave", label: "Плетение", options: ["Бисмарк", "Якорное", "Панцирное"] },
        ],
      },
    ],
  },
];

export function getCategoryBySlug(slug) {
  for (const item of menuItems) {
    if (item.slug === slug) {
      // Собираем уникальные фильтры из всех подкатегорий для родительской категории
      const aggregatedFilters = [];
      const filterIds = new Set();

      item.subcategories?.forEach(sub => {
        sub.filters?.forEach(f => {
          if (!filterIds.has(f.id)) {
            filterIds.add(f.id);
            aggregatedFilters.push(f);
          } else {
            // Если такой фильтр уже есть (например, "stone"), объединяем опции
            const existing = aggregatedFilters.find(ex => ex.id === f.id);
            existing.options = [...new Set([...existing.options, ...f.options])];
          }
        });
      });

      return { ...item, filters: aggregatedFilters, isParent: true };
    }

    if (item.subcategories) {
      const sub = item.subcategories.find((s) => s.slug === slug);
      if (sub) return { ...sub, isParent: false };
    }
  }
  return null;
}
