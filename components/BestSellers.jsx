'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const BestSellers = ({ products }) => {
  const bestSellers = products?.slice(0, 6) || [];

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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bestsellers</h2>
          <p className="text-gray-600">Our most popular tech gadgets this month</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                {product.badges && product.badges.length > 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    {product.badges.map((badge, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-xs font-bold rounded-full uppercase ${
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
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.image[0]}
                    alt={product.name}
                    width={555}
                    height={555}
                    className="w-full h-64 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>

              <div className="p-4">
                <Link href={`/product/${product.slug}`}>
                  <h3 className="text-sm font-medium text-gray-900 mb-2 hover:text-green-600 cursor-pointer">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center mb-2">
                  <div className="flex space-x-1">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
