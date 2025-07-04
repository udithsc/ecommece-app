import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

// Import Product type from cartStore for consistency
import type { Product } from './cartStore';

interface WishlistState {
  // State
  wishlistItems: Product[];

  // Actions
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  toggleWishlist: (product: Product) => void;
}

const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      // State
      wishlistItems: [],

      // Actions
      addToWishlist: (product: Product) => {
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

      removeFromWishlist: (productId: string) => {
        const { wishlistItems } = get();
        const product = wishlistItems.find((item) => item._id === productId);

        set({
          wishlistItems: wishlistItems.filter((item) => item._id !== productId),
        });

        if (product) {
          toast.success(`${product.name} removed from wishlist`);
        }
      },

      isInWishlist: (productId: string): boolean => {
        const { wishlistItems } = get();
        return wishlistItems.some((item) => item._id === productId);
      },

      clearWishlist: () => {
        set({ wishlistItems: [] });
        toast.success('Wishlist cleared');
      },

      toggleWishlist: (product: Product) => {
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
export const useWishlistCount = (): number => useWishlistStore((state) => state.wishlistItems.length);

// Export types for use in components
export type { WishlistState };
export default useWishlistStore;