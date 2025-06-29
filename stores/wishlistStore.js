import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      // State
      wishlistItems: [],

      // Actions
      addToWishlist: (product) => {
        const { wishlistItems } = get();
        const isAlreadyInWishlist = wishlistItems.find((item) => item._id === product._id);

        if (isAlreadyInWishlist) {
          toast.error('Product already in wishlist');
          return;
        }

        set({
          wishlistItems: [...wishlistItems, product],
        });
        toast.success(`${product.name} added to wishlist`);
      },

      removeFromWishlist: (productId) => {
        const { wishlistItems } = get();
        const product = wishlistItems.find((item) => item._id === productId);

        set({
          wishlistItems: wishlistItems.filter((item) => item._id !== productId),
        });

        if (product) {
          toast.success(`${product.name} removed from wishlist`);
        }
      },

      isInWishlist: (productId) => {
        const { wishlistItems } = get();
        return wishlistItems.some((item) => item._id === productId);
      },

      clearWishlist: () => {
        set({ wishlistItems: [] });
        toast.success('Wishlist cleared');
      },

      toggleWishlist: (product) => {
        const { isInWishlist, addToWishlist, removeFromWishlist } = get();

        if (isInWishlist(product._id)) {
          removeFromWishlist(product._id);
        } else {
          addToWishlist(product);
        }
      },
    }),
    {
      name: 'wishlist-storage',
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
        wishlistItems: state.wishlistItems,
      }),
    }
  )
);

// Selector for wishlist count
export const useWishlistCount = () => useWishlistStore((state) => state.wishlistItems.length);

export default useWishlistStore;
