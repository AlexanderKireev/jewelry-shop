export default function Footer() {
    return (
      <footer className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © 2026 Магазин 2026. Все права защищены.
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Каталог</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Доставка</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Помощь</a>
          </div>
        </div>
      </footer>
    )
  }
  