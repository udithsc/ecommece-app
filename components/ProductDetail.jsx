'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
  AiOutlineHeart,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';

import { Product } from './';
import { useStateContext } from '../context/StateContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetail = ({ product, products }) => {
  const { image, name, details, price, originalPrice, rating, reviews, category, inStock, badges } =
    product;
  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const remainingStars = 5 - fullStars;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar key={i} className="text-yellow-400" />);
    }

    for (let i = 0; i < remainingStars; i++) {
      stars.push(<AiOutlineStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  const relatedProducts =
    products?.filter((p) => p.category === category && p._id !== product._id)?.slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/shop" className="text-gray-500 hover:text-gray-700">
              Shop
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <div className="relative mb-4">
                {badges && badges.length > 0 && (
                  <div className="absolute top-4 left-4 z-10">
                    {badges.map((badge, badgeIndex) => (
                      <span
                        key={badgeIndex}
                        className={`px-3 py-1 text-sm font-bold rounded-full uppercase ${
                          badge === 'SALE'
                            ? 'bg-red-100 text-red-800'
                            : badge === 'HOT'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
                <img
                  src={image && image[index]}
                  className="w-full h-96 object-cover rounded-lg"
                  alt={name}
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {image?.map((item, i) => (
                  <img
                    key={i}
                    src={item}
                    className={`w-full h-20 object-cover rounded cursor-pointer transition-all ${
                      i === index ? 'ring-2 ring-green-500' : 'hover:opacity-75'
                    }`}
                    onMouseEnter={() => setIndex(i)}
                    alt={`${name} view ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">{renderStars(rating)}</div>
                  <span className="text-gray-600">({reviews} reviews)</span>
                  <span className="text-green-600 font-medium">{category}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-green-600">${price?.toFixed(2)}</span>
                {originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <BsCheck className="text-green-600 w-5 h-5" />
                <span
                  className={`text-sm font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}
                >
                  {inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed">{details}</p>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decQty}
                      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-l-lg"
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="px-4 py-2 border-l border-r border-gray-300 min-w-[3rem] text-center">
                      {qty}
                    </span>
                    <button
                      onClick={incQty}
                      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-r-lg"
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                  onClick={() => onAdd(product, qty)}
                  disabled={!inStock}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="flex-1 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors duration-200 font-medium"
                  onClick={handleBuyNow}
                  disabled={!inStock}
                >
                  Buy Now
                </button>
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t">
                <button
                  onClick={() =>
                    isInWishlist(product._id)
                      ? removeFromWishlist(product._id)
                      : addToWishlist(product)
                  }
                  className={`flex items-center space-x-2 transition-colors ${
                    isInWishlist(product._id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                  }`}
                >
                  <AiOutlineHeart
                    className={`w-5 h-5 ${isInWishlist(product._id) ? 'fill-current' : ''}`}
                  />
                  <span>
                    {isInWishlist(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <AiOutlineShareAlt className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="border-t">
            <div className="flex space-x-8 px-8">
              {['description', 'reviews', 'specifications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="px-8 py-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">{details}</p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    This high-quality {name.toLowerCase()} is designed for professional use and
                    everyday tasks. Built with durable materials and precision engineering, it
                    delivers reliable performance and long-lasting value.
                  </p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-1">{renderStars(rating)}</div>
                    <span className="text-xl font-semibold">{rating}</span>
                    <span className="text-gray-600">({reviews} reviews)</span>
                  </div>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">John D.</span>
                        <div className="flex items-center space-x-1">{renderStars(5)}</div>
                      </div>
                      <p className="text-gray-600">
                        Excellent product! Very satisfied with the quality and performance.
                      </p>
                    </div>
                    <div className="border-b pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">Sarah M.</span>
                        <div className="flex items-center space-x-1">{renderStars(4)}</div>
                      </div>
                      <p className="text-gray-600">
                        Good value for money. Works as expected and shipping was fast.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Product Details</h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Category:</dt>
                        <dd className="font-medium">{category}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">SKU:</dt>
                        <dd className="font-medium">{product._id}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Weight:</dt>
                        <dd className="font-medium">2.5 kg</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Dimensions:</dt>
                        <dd className="font-medium">25 x 15 x 10 cm</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
