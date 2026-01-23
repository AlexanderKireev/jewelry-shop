"use client";
import { Heart, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function ProductCard({ product }) {
  const addToCart = (e) => {
    e.preventDefault(); // Чтобы не срабатывал переход по ссылке, если карточка будет ссылкой
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    // Вместо alert лучше использовать тихий Toast, но пока оставим логику
    console.log("Добавлено в корзину");
  };

  return (
    <div className="group bg-white border border-gray-100 flex flex-col relative transition-all duration-300 hover:border-gray-300">
      {/* 1. БЛОК ИЗОБРАЖЕНИЯ */}

      <div className="relative aspect-[3/4] overflow-hidden bg-white">
        <Image
          src={product.image_url || "/placeholder.png"}
          alt={product.name}
          fill // Заполняет контейнер aspect-[3/4]
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" // Подсказка браузеру для выбора размера
          className="object-contain transition-transform duration-500 group-hover:scale-105" // object-contain не обрезает 800x800
          priority={false} // Картинки в списке загружаются лениво
        />
        {/* Кнопка "Избранное" */}
        <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-amber-500 transition-colors border border-gray-100 shadow-sm">
          <Heart size={16} strokeWidth={2} />
        </button>

        {/* Рейтинг поверх фото (в углу) */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded-sm border border-gray-100 shadow-sm">
          <Star size={10} className="fill-amber-500 text-amber-500" />
          <span className="text-[10px] font-bold text-gray-700">4.8</span>
        </div>
      </div>

      {/* 2. ИНФОРМАЦИЯ */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Категория/Бренд (мелкий капс как в хидере) */}
        {/* <span className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">
          {product.category_slug?.replace('-', ' ') || "Коллекция 2026"}
        </span> */}

        {/* Название */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 leading-tight grow ">
          {product.name}
        </h3>

        {/* Цена и Корзина */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#003366]">
              {product.price?.toLocaleString()} MDL
            </span>
          </div>

          {/* Минималистичная кнопка корзины */}
          <button
            onClick={addToCart}
            className="p-2 bg-[#003366] text-white hover:bg-amber-500 transition-colors shadow-sm"
            title="В корзину">
            <ShoppingCart size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
