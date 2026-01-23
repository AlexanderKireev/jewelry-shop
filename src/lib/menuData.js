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

// Функция принимает slug (например, 'koltsa-zoloto') и возвращает весь объект категории
export function getCategoryBySlug(slug) {
  for (const item of menuItems) {
    // Если это основная категория
    if (item.slug === slug) return item;

    // Если это подкатегория
    if (item.subcategories) {
      const sub = item.subcategories.find((s) => s.slug === slug);
      if (sub) return sub;
    }
  }
  return null;
}
