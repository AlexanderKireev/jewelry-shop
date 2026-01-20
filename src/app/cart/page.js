'use client';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const [items, setItems] = useState([]);

  // Загружаем данные только один раз при монтировании компонента
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Проверяем, что данные действительно изменились, прежде чем обновлять
        setItems(parsedCart);
      } catch (e) {
        console.error("Ошибка парсинга корзины", e);
      }
    }
  }, []); // Пустой массив зависимостей важен!


  // Функция для удаления товара
  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const total = items.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Корзина</h1>
        <a href="/" className="text-blue-600 hover:underline">← Назад в магазин</a>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <p className="text-gray-500">Ваша корзина пока пуста</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
              <div>
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-blue-600 font-medium">{item.price} MDL</p>
              </div>
              <button 
                onClick={() => removeItem(index)}
                className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg transition"
              >
                Удалить
              </button>
            </div>
          ))}

          <div className="mt-10 p-6 bg-gray-100 rounded-2xl">
            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Итого:</span>
              <span>{total} MDL</span>
            </div>
            
            <div className="space-y-3">
              <input type="text" placeholder="Ваше имя" className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none" />
              <input type="text" placeholder="Номер телефона" className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none" />
              <button 
                onClick={() => alert('Почти готово! Сейчас сделаем отправку данных.')}
                className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
