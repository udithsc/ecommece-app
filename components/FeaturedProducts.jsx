'use client'

import React from 'react';
import Link from 'next/link';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const FeaturedProducts = ({ products }) => {
  const featuredProducts = products?.filter(product => product.featured) || [];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar key={i} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<AiFillStar key="half" className="text-yellow-400" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<AiOutlineStar key={`empty-${i}`} className="text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-1">
              <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">All</button>
              <button className="px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-primary rounded-full text-sm font-medium transition-colors">Fruits & Vegetables</button>
              <button className="px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-primary rounded-full text-sm font-medium transition-colors">Dairy & Bakery</button>
              <button className="px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-primary rounded-full text-sm font-medium transition-colors">Beverages</button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 border border-gray-300 rounded hover:border-green-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-2 border border-gray-300 rounded hover:border-green-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <div key={product._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                {product.badges && product.badges.length > 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    {product.badges.map((badge, index) => (
                      <span 
                        key={index}
                        className={`px-2 py-1 text-xs font-bold rounded-full uppercase ${
                          badge === 'SALE' ? 'bg-red-100 text-red-800' : 
                          badge === 'HOT' ? 'bg-orange-100 text-orange-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
                <Link href={`/product/${product.slug}`}>
                  <img 
                    src={product.image[0]} 
                    alt={product.name}
                    className="w-full h-64 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>
              
              <div className="p-4">
                <Link href={`/product/${product.slug}`}>
                  <h3 className="text-sm font-medium text-gray-900 mb-2 hover:text-primary cursor-pointer">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center mb-2">
                  <div className="flex space-x-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/shop" className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;