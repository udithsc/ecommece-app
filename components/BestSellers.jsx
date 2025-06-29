'use client';

import React from 'react';
import { Product } from './';

const BestSellers = ({ products }) => {
  const bestSellers = products?.slice(0, 6) || [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bestsellers</h2>
          <p className="text-gray-600">Our most popular tech gadgets this month</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
