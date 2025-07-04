'use client';

import React from 'react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  hoverColor: string;
}

const CategorySection: React.FC = () => {
  const categories: Category[] = [
    {
      id: 1,
      name: 'Laptops',
      icon: '💻',
      color: 'bg-blue-100',
      hoverColor: 'hover:bg-blue-200',
    },
    {
      id: 2,
      name: 'Smartphones',
      icon: '📱',
      color: 'bg-green-100',
      hoverColor: 'hover:bg-green-200',
    },
    {
      id: 3,
      name: 'Audio',
      icon: '🎧',
      color: 'bg-purple-100',
      hoverColor: 'hover:bg-purple-200',
    },
    {
      id: 4,
      name: 'Peripherals',
      icon: '🖱️',
      color: 'bg-yellow-100',
      hoverColor: 'hover:bg-yellow-200',
    },
    {
      id: 5,
      name: 'Storage',
      icon: '💾',
      color: 'bg-red-100',
      hoverColor: 'hover:bg-red-200',
    },
    {
      id: 6,
      name: 'Wearables',
      icon: '⌚',
      color: 'bg-indigo-100',
      hoverColor: 'hover:bg-indigo-200',
    },
    {
      id: 7,
      name: 'Accessories',
      icon: '🔌',
      color: 'bg-pink-100',
      hoverColor: 'hover:bg-pink-200',
    },
    {
      id: 8,
      name: 'Networking',
      icon: '📡',
      color: 'bg-teal-100',
      hoverColor: 'hover:bg-teal-200',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Categories</h2>
          <p className="text-gray-600">Explore our wide range of computer and phone accessories</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${encodeURIComponent(category.name.toLowerCase())}`}
              className="group"
            >
              <div
                className={`${category.color} ${category.hoverColor} rounded-xl p-6 text-center transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-medium text-gray-900 text-sm leading-tight">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;