'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    const isAlreadyInWishlist = wishlistItems.find((item) => item._id === product._id);

    if (isAlreadyInWishlist) {
      toast.error('Product already in wishlist');
      return;
    }

    setWishlistItems([...wishlistItems, product]);
    toast.success(`${product.name} added to wishlist`);
  };

  const removeFromWishlist = (productId) => {
    const product = wishlistItems.find((item) => item._id === productId);
    setWishlistItems(wishlistItems.filter((item) => item._id !== productId));

    if (product) {
      toast.success(`${product.name} removed from wishlist`);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast.success('Wishlist cleared');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: wishlistItems.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
