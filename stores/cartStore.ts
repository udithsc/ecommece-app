import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

// Product interface based on the existing data structure
interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string[];
  details: string;
  featured: boolean;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badges: string[];
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  // State
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;

  // Actions
  onAdd: (product: Product, quantity: number) => void;
  onRemove: (product: Product) => void;
  toggleCartItemQuantity: (id: string, value: 'inc' | 'dec') => void;
  incQty: () => void;
  decQty: () => void;
  setQty: (qty: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // State
      cartItems: [],
      totalPrice: 0,
      totalQuantities: 0,
      qty: 1,

      // Actions
      onAdd: (product: Product, quantity: number) => {
        const { cartItems, totalPrice, totalQuantities } = get();
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        const newTotalPrice = totalPrice + product.price * quantity;
        const newTotalQuantities = totalQuantities + quantity;

        if (checkProductInCart) {
          const updatedCartItems = cartItems.map((cartProduct) => {
            if (cartProduct._id === product._id) {
              return {
                ...cartProduct,
                quantity: cartProduct.quantity + quantity,
              };
            }
            return cartProduct;
          });

          set({
            cartItems: updatedCartItems,
            totalPrice: newTotalPrice,
            totalQuantities: newTotalQuantities,
          });
        } else {
          const newProduct: CartItem = { ...product, quantity };
          set({
            cartItems: [...cartItems, newProduct],
            totalPrice: newTotalPrice,
            totalQuantities: newTotalQuantities,
          });
        }

        toast.success(`${quantity} ${product.name} added to the cart.`);
      },

      onRemove: (product: Product) => {
        const { cartItems, totalPrice, totalQuantities } = get();
        const foundProduct = cartItems.find((item) => item._id === product._id);

        if (foundProduct) {
          const newCartItems = cartItems.filter((item) => item._id !== product._id);
          const newTotalPrice = totalPrice - foundProduct.price * foundProduct.quantity;
          const newTotalQuantities = totalQuantities - foundProduct.quantity;

          set({
            cartItems: newCartItems,
            totalPrice: newTotalPrice,
            totalQuantities: newTotalQuantities,
          });
        }
      },

      toggleCartItemQuantity: (id: string, value: 'inc' | 'dec') => {
        const { cartItems, totalPrice, totalQuantities } = get();
        const foundProduct = cartItems.find((item) => item._id === id);

        if (!foundProduct) return;

        const otherCartItems = cartItems.filter((item) => item._id !== id);

        if (value === 'inc') {
          const updatedProduct: CartItem = { ...foundProduct, quantity: foundProduct.quantity + 1 };
          set({
            cartItems: [...otherCartItems, updatedProduct],
            totalPrice: totalPrice + foundProduct.price,
            totalQuantities: totalQuantities + 1,
          });
        } else if (value === 'dec' && foundProduct.quantity > 1) {
          const updatedProduct: CartItem = { ...foundProduct, quantity: foundProduct.quantity - 1 };
          set({
            cartItems: [...otherCartItems, updatedProduct],
            totalPrice: totalPrice - foundProduct.price,
            totalQuantities: totalQuantities - 1,
          });
        }
      },

      incQty: () => set((state) => ({ qty: state.qty + 1 })),

      decQty: () => set((state) => ({ qty: state.qty > 1 ? state.qty - 1 : 1 })),

      setQty: (qty: number) => set({ qty }),

      clearCart: () =>
        set({
          cartItems: [],
          totalPrice: 0,
          totalQuantities: 0,
          qty: 1,
        }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        cartItems: state.cartItems,
        totalPrice: state.totalPrice,
        totalQuantities: state.totalQuantities,
      }),
    }
  )
);

// Export types for use in components
export type { Product, CartItem, CartState };
export default useCartStore;