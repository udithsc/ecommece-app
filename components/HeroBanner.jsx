'use client';

import React from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineRight } from 'react-icons/ai';
import { FiTruck, FiHeadphones, FiShield, FiRefreshCw } from 'react-icons/fi';

const HeroBanner = ({ heroBanner }) => {
  const categories = [
    { name: 'Fruits & Vegetables', icon: '🥕' },
    { name: 'Dairy & Bakery', icon: '🥛' },
    { name: 'Meat & Seafood', icon: '🐟' },
    { name: 'Beverages', icon: '🥤' },
    { name: 'Breakfast & Cereal', icon: '🥣' },
    { name: 'Frozen Foods', icon: '❄️' },
    { name: 'Biscuits & Snacks', icon: '🍪' },
    { name: 'Grocery & Staples', icon: '🌾' },
  ];

  const services = [
    {
      icon: <FiTruck className="w-12 h-12" />,
      title: 'Free Shipping',
      subtitle: 'Free shipping with discount',
    },
    {
      icon: <FiHeadphones className="w-12 h-12" />,
      title: 'Great Support 24/7',
      subtitle: 'Instant access to Contact',
    },
    {
      icon: <FiShield className="w-12 h-12" />,
      title: '100% Secure',
      subtitle: 'We ensure your money is safe',
    },
    {
      icon: <FiRefreshCw className="w-12 h-12" />,
      title: 'Money-Back',
      subtitle: '30 days money-back',
    },
  ];

  return (
    <div>
      {/* Main Hero Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 py-8">
            {/* Categories Sidebar */}
            <div className="w-80 bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-primary">
                <div className="flex items-center space-x-2 text-white">
                  <AiOutlineMenu className="w-5 h-5" />
                  <span className="font-semibold">All Categories</span>
                </div>
              </div>
              <div className="p-2">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-200 border-b border-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                    <AiOutlineRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Main Banner */}
            <div className="flex-1 bg-gradient-to-r from-green-100 via-green-50 to-orange-50 rounded-lg overflow-hidden relative">
              <div className="flex h-96">
                <div className="flex-1 p-12 flex flex-col justify-center">
                  <div className="text-sm text-primary font-medium mb-2">
                    Best Deal Online on Smart Watches
                  </div>
                  <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    Get up to
                    <br />
                    <span className="text-primary">-30% off</span>
                  </h1>
                  <p className="text-gray-600 mb-6">
                    Don&apos;t miss out on our amazing grocery deals!
                    <br />
                    Fresh products at unbeatable prices.
                  </p>
                  <Link href="/shop">
                    <button className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold inline-flex items-center">
                      Shop Now
                      <AiOutlineRight className="ml-2 w-4 h-4" />
                    </button>
                  </Link>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/public/a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555.webp"
                      alt="Featured Products"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  {/* Floating Price Tag */}
                  <div className="absolute top-8 right-8 bg-white rounded-full p-4 shadow-lg">
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Only</div>
                      <div className="text-xl font-bold text-primary">$79</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Area */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gray-100 rounded-full text-primary">{service.icon}</div>
                </div>
                <h4 className="font-semibold text-lg text-gray-900 mb-2">{service.title}</h4>
                <p className="text-sm text-gray-600">{service.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
