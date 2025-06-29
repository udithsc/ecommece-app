'use client'

import React from 'react';
import Link from 'next/link';

const PromoBanner = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg overflow-hidden">
          <div className="flex items-center h-40">
            <div className="flex-1 p-8">
              <h2 className="text-3xl font-bold text-white mb-2">Hundreds Hand Tools</h2>
              <p className="text-red-100 mb-4">Hammers, Chisels, Universal Pliers, Ratchets, Squares, Saws</p>
              <Link href="/shop">
                <button className="bg-white text-red-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold">
                  Shop Now
                </button>
              </Link>
            </div>
            <div className="flex-1 flex justify-end items-center p-8">
              <div className="grid grid-cols-6 gap-2">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="w-12 h-12 bg-red-400 rounded opacity-50"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;