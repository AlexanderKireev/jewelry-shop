import Link from 'next/link';
import { menuItems } from '@/lib/menuData';

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      
      {/* Главный баннер */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Здесь можно добавить фоновое фото ювелирных изделий */}
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Вечная красота</h1>
          <p className="text-lg md:text-xl font-light tracking-widest uppercase mb-10 text-gray-300">
            Эксклюзивные ювелирные изделия 2026
          </p>
          <Link 
            href="/catalog/zoloto" 
            className="bg-white text-gray-900 px-10 py-4 rounded-full font-bold hover:bg-amber-500 hover:text-white transition-all shadow-xl"
          >
            Смотреть коллекцию
          </Link>
        </div>
      </section>

      {/* Сетка основных категорий */}
      <section className="max-w-7xl mx-auto px-6 w-full">
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
              {/* Здесь можно добавить фоновую картинку для каждой категории */}
            </Link>
          ))}
        </div>
      </section>

      {/* Блок преимуществ */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-3xl mb-4">💎</div>
            <h4 className="font-bold mb-2">Высшая проба</h4>
            <p className="text-gray-500 text-sm">Гарантируем качество каждого изделия и подлинность камней.</p>
          </div>
          <div>
            <div className="text-3xl mb-4">🚚</div>
            <h4 className="font-bold mb-2">Доставка по Молдове</h4>
            <p className="text-gray-500 text-sm">Бережная доставка в любой уголок страны за 24 часа.</p>
          </div>
          <div>
            <div className="text-3xl mb-4">🎁</div>
            <h4 className="font-bold mb-2">Подарочная упаковка</h4>
            <p className="text-gray-500 text-sm">Каждое украшение доставляется в фирменной премиум-коробке.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
