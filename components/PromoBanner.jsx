'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const PromoBanner = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use consistent classes for both server and client
  const containerClasses = "py-16 bg-white";
  const bannerClasses = "flex items-center h-40";
  const contentClasses = "flex-1 p-8";
  const titleClasses = "text-3xl font-bold text-white mb-2";
  const descClasses = "text-red-100 mb-4";
  const buttonClasses = "bg-white text-red-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold";
  const iconContainerClasses = "flex-1 flex justify-end items-center p-8";
  const gridClasses = "grid grid-cols-6 gap-2";
  const iconClasses = "w-12 h-12 bg-red-400 rounded opacity-50";

  // If client-side rendering is needed for responsive behavior, apply after hydration
  if (isClient) {
    return (
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center min-h-[160px] md:h-40">
              <div className="flex-1 p-6 md:p-8 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Amazing Phone Accessories</h2>
                <p className="text-red-100 mb-4 text-sm md:text-base">
                  Cases, Chargers, Headphones, Screen Protectors, Power Banks
                </p>
                <Link href="/shop">
                  <button className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold">
                    Shop Now
                  </button>
                </Link>
              </div>
              <div className="flex-1 flex justify-center md:justify-end items-center p-4 md:p-8">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="w-10 h-10 md:w-12 md:h-12 bg-red-400 rounded opacity-50"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Server-side render with consistent classes
  return (
    <section className={containerClasses}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg overflow-hidden">
          <div className={bannerClasses}>
            <div className={contentClasses}>
              <h2 className={titleClasses}>Amazing Phone Accessories</h2>
              <p className={descClasses}>
                Cases, Chargers, Headphones, Screen Protectors, Power Banks
              </p>
              <Link href="/shop">
                <button className={buttonClasses}>
                  Shop Now
                </button>
              </Link>
            </div>
            <div className={iconContainerClasses}>
              <div className={gridClasses}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={iconClasses}></div>
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
