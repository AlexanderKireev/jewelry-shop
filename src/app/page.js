import Link from "next/link";
import { menuItems } from "@/lib/menuData";
import Image from "next/image"; // Не забудьте импорт для оптимизации фото

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Главный баннер */}
      {/* Главный баннер во всю ширину */}
      <section className="w-full bg-white">
        {/* Удаляем контейнеры и отступы, ставим h-screen или фиксированную высоту */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-1 h-[90vh]">
          {/* ЛЕВАЯ ЧАСТЬ: 60% ширины */}
          <div className="relative lg:col-span-6 overflow-hidden group bg-gray-900">
            <Image
              src="/banner-main.jpg"
              alt="Эксклюзивные украшения 2026"
              fill
              priority // Важно для SEO и скорости загрузки первого экрана
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 z-10" />
            <div className="relative z-20 h-full flex flex-col items-start justify-center px-8 md:px-20">
              {/* <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight">
          Вечная <br/> красота
        </h1> */}
              <p className="text-white/90 text-xl md:text-2xl font-light tracking-[0.2em] uppercase mb-10">
                Коллекция 2026
              </p>
              <Link
                href="/catalog/zoloto"
                className="border-2 border-white text-white px-12 py-5 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                Смотреть коллекцию
              </Link>
            </div>
          </div>

          {/* ПРАВАЯ ЧАСТЬ: 40% ширины, три блока */}
          <div className="lg:col-span-4 grid grid-rows-3 gap-1">
            {/* Золото */}
            <Link href="/catalog/zoloto" className="relative group overflow-hidden">
              <Image
                src="/gold.jpg"
                alt="Золото"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-500" />
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center">
                  <span className="text-white text-2xl font-serif tracking-widest uppercase block mb-1">
                    Золото
                  </span>
                  <span className="text-white/0 group-hover:text-white/100 text-[10px] uppercase tracking-[0.3em] transition-all duration-500">
                    Перейти
                  </span>
                </div>
              </div>
            </Link>

            {/* Серебро */}
            <Link href="/catalog/serebro" className="relative group overflow-hidden">
              <Image
                src="/silver.jpg"
                alt="Серебро"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-500" />
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center">
                  <span className="text-white text-2xl font-serif tracking-widest uppercase block mb-1">
                    Серебро
                  </span>
                  <span className="text-white/0 group-hover:text-white/100 text-[10px] uppercase tracking-[0.3em] transition-all duration-500">
                    Перейти
                  </span>
                </div>
              </div>
            </Link>

            {/* Цепочки */}
            <Link href="/catalog/chains" className="relative group overflow-hidden">
              <Image
                src="/chains.jpg"
                alt="Цепочки"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-500" />
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center">
                  <span className="text-white text-2xl font-serif tracking-widest uppercase block mb-1">
                    Цепочки
                  </span>
                  <span className="text-white/0 group-hover:text-white/100 text-[10px] uppercase tracking-[0.3em] transition-all duration-500">
                    Перейти
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* <section className="max-w-7xl mx-auto px-6 w-full">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">Наши направления</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <Link 
              key={item.slug} 
              href={`/catalog/${item.slug}`}
              className="group relative h-96 rounded-[2.5rem] overflow-hidden bg-gray-100 border border-gray-100 shadow-sm transition-transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-sm text-amber-600 font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  Перейти в каталог →
                </p>
              </div>
             
            </Link>
          ))}
        </div>
      </section> */}

      {/* Блок преимуществ */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-3xl mb-4">💎</div>
            <h4 className="font-bold mb-2">Высшая проба</h4>
            <p className="text-gray-500 text-sm">
              Гарантируем качество каждого изделия и подлинность камней.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-4">🚚</div>
            <h4 className="font-bold mb-2">Доставка по Молдове</h4>
            <p className="text-gray-500 text-sm">
              Бережная доставка в любой уголок страны за 24 часа.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-4">🎁</div>
            <h4 className="font-bold mb-2">Подарочная упаковка</h4>
            <p className="text-gray-500 text-sm">
              Каждое украшение доставляется в фирменной премиум-коробке.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
