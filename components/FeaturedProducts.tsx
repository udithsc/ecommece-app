'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from './';
import type { Product as ProductType } from '../stores/cartStore';

interface FeaturedProductsProps {
  products: ProductType[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const featuredProducts = products?.filter((product) => product.featured) || [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-1">
              <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
                All
              </button>
              <button className="px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-primary rounded-full text-sm font-medium transition-colors">
                Fruits & Vegetables
              </button>
              <button className="px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-primary rounded-full text-sm font-medium transition-colors">
                Dairy & Bakery
              </button>
              <button className="px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-primary rounded-full text-sm font-medium transition-colors">
                Beverages
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 border border-gray-300 rounded hover:border-green-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="p-2 border border-gray-300 rounded hover:border-green-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/shop"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;