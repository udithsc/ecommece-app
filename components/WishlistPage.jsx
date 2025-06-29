'use client';

import React from 'react';
import Link from 'next/link';
import { AiOutlineClose, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useStateContext } from '../context/StateContext';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { onAdd } = useStateContext();

  const handleAddToCart = (product) => {
    onAdd(product, 1);
    removeFromWishlist(product._id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">Wishlist</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-8">
              <AiOutlineHeart className="w-24 h-24 mx-auto text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Save your favorite items to your wishlist for easy access later.
            </p>
            <Link href="/shop">
              <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wishlist Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {/* Wishlist Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                    <span className="text-gray-600">{wishlistItems.length} items</span>
                  </div>
                </div>

                {/* Wishlist Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-700">Product</th>
                        <th className="text-right p-4 font-medium text-gray-700">Price</th>
                        <th className="text-center p-4 font-medium text-gray-700">Stock Status</th>
                        <th className="text-center p-4 font-medium text-gray-700">Action</th>
                        <th className="p-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {wishlistItems.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                  src={item.image[0]}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900 hover:text-primary cursor-pointer">
                                  <Link href={`/product/${item.slug}`}>{item.name}</Link>
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {item.details?.substring(0, 60)}...
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <span className="font-bold text-primary text-lg">
                              ${item.price.toFixed(2)}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              In Stock
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm inline-flex items-center space-x-2"
                            >
                              <AiOutlineShoppingCart className="w-4 h-4" />
                              <span>Add to Cart</span>
                            </button>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => removeFromWishlist(item._id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <AiOutlineClose className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Wishlist Actions */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <Link href="/shop">
                      <button className="text-primary hover:text-green-700 font-medium">
                        ← Continue Shopping
                      </button>
                    </Link>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => {
                          wishlistItems.forEach((item) => handleAddToCart(item));
                        }}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        Add All to Cart
                      </button>
                      <button
                        onClick={clearWishlist}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wishlist Summary Sidebar */}
            <div className="space-y-6">
              {/* Wishlist Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Wishlist Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-medium">{wishlistItems.length}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Total Value</span>
                    <span className="font-bold text-primary">
                      ${wishlistItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Share Wishlist */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Share Your Wishlist</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Share your wishlist with friends and family to let them know what you&apos;d like!
                </p>
                <div className="space-y-3">
                  <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                    Share via Email
                  </button>
                  <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium">
                    Share via WhatsApp
                  </button>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Why Use Wishlist?</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <AiOutlineHeart className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Save Favorites</h4>
                      <p className="text-sm text-gray-600">Keep track of items you love</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FiTruck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Quick Purchase</h4>
                      <p className="text-sm text-gray-600">Add to cart easily later</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FiShield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Share with Others</h4>
                      <p className="text-sm text-gray-600">Gift ideas for family</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recently Viewed */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">You Might Also Like</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">Fresh Organic Apples</h4>
                      <p className="text-primary font-bold text-sm">$4.99</p>
                    </div>
                    <button className="text-primary hover:text-green-700">
                      <AiOutlineHeart className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">Organic Milk</h4>
                      <p className="text-primary font-bold text-sm">$3.49</p>
                    </div>
                    <button className="text-primary hover:text-green-700">
                      <AiOutlineHeart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
