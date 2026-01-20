'use client'; // Это делает компонент интерактивным

export default function ProductCard({ product }) {
  const addToCart = () => {
    // Получаем корзину из памяти браузера или создаем пустую
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Добавляем текущий товар
    cart.push(product);
    
    // Сохраняем обратно
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`Товар "${product.name}" добавлен в корзину!`);
  };

  return (
    <div className="border p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition">
      <img 
        src={product.image_url} 
        alt={product.name} 
        className="w-full h-48 object-cover rounded-md mb-4" 
      />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-500 text-sm mb-4">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-blue-600">{product.price} MDL</span>
        <button 
          onClick={addToCart}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Купить
        </button>
      </div>
    </div>
  );
}
