import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      cartItems: [],
      totalPrice: 0,
      totalQuantities: 0,
      qty: 1,

      // Actions

      onAdd: (product, quantity) => {
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
          const newProduct = { ...product, quantity };
          set({
            cartItems: [...cartItems, newProduct],
            totalPrice: newTotalPrice,
            totalQuantities: newTotalQuantities,
          });
        }

        toast.success(`${quantity} ${product.name} added to the cart.`);
      },

      onRemove: (product) => {
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

      toggleCartItemQuantity: (id, value) => {
        const { cartItems, totalPrice, totalQuantities } = get();
        const foundProduct = cartItems.find((item) => item._id === id);

        if (!foundProduct) return;

        const otherCartItems = cartItems.filter((item) => item._id !== id);

        if (value === 'inc') {
          const updatedProduct = { ...foundProduct, quantity: foundProduct.quantity + 1 };
          set({
            cartItems: [...otherCartItems, updatedProduct],
            totalPrice: totalPrice + foundProduct.price,
            totalQuantities: totalQuantities + 1,
          });
        } else if (value === 'dec' && foundProduct.quantity > 1) {
          const updatedProduct = { ...foundProduct, quantity: foundProduct.quantity - 1 };
          set({
            cartItems: [...otherCartItems, updatedProduct],
            totalPrice: totalPrice - foundProduct.price,
            totalQuantities: totalQuantities - 1,
          });
        }
      },

      incQty: () => set((state) => ({ qty: state.qty + 1 })),

      decQty: () => set((state) => ({ qty: state.qty > 1 ? state.qty - 1 : 1 })),

      setQty: (qty) => set({ qty }),

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

export default useCartStore;
