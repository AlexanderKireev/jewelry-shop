import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (product) => set((state) => ({ 
        cartItems: [...state.cartItems, product] 
      })),
      removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== id)
      })),
      clearCart: () => set({ cartItems: [] }),
    }),
    { name: 'cart-storage' }
  )
)
