'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import useWishlistStore from '../stores/wishlistStore';
import useCartStore from '../stores/cartStore';

const Product = ({ product }) => {
  const [isClient, setIsClient] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { onAdd } = useCartStore();

  const { image, name, slug, price, _id } = product;
  const inWishlist = isInWishlist(_id);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(_id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAdd(product, 1);
  };

  // Enhanced version for client-side
  if (isClient) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative aspect-square overflow-hidden">
          <Link href={`/product/${slug}`}>
            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
              <Image
                src={image && image[0] ? (image[0].startsWith('//') ? `https:${image[0]}` : image[0].startsWith('/') ? image[0] : `/${image[0]}`) : '/placeholder-product.jpg'}
                alt={name}
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                style={{ objectPosition: 'center' }}
              />
            </div>
          </Link>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 w-10 h-10 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-opacity-100"
          >
            {inWishlist ? (
              <AiFillHeart className="w-5 h-5 text-red-500" />
            ) : (
              <AiOutlineHeart className="w-5 h-5 text-gray-600 hover:text-red-500" />
            )}
          </button>

          {/* Add to Cart Button - Shows on Hover */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary bg-opacity-95 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-opacity-100 transition-all duration-200 font-medium text-sm flex items-center justify-center space-x-2 shadow-lg"
            >
              <AiOutlineShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

        <div className="p-4">
          <Link href={`/product/${slug}`}>
            <h3 className="font-medium text-gray-900 mb-2 hover:text-primary cursor-pointer transition-colors h-12 overflow-hidden leading-6">
              {name}
            </h3>
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">${price}</span>
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-sm">★</span>
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-1">(4.5)</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Server-side render with original structure
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        <Link href={`/product/${slug}`}>
          <Image
            src={image && image[0]}
            alt={name}
            width={555}
            height={555}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          {inWishlist ? (
            <AiFillHeart className="w-4 h-4 text-red-500" />
          ) : (
            <AiOutlineHeart className="w-4 h-4 text-gray-400 hover:text-red-500" />
          )}
        </button>

        {/* Add to Cart Button - Shows on Hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-sm flex items-center justify-center space-x-2"
          >
            <AiOutlineShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      <div className="p-4">
        <Link href={`/product/${slug}`}>
          <h3 className="font-medium text-gray-900 mb-2 hover:text-primary cursor-pointer transition-colors">
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${price}</span>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-sm text-gray-500">(4.5)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
