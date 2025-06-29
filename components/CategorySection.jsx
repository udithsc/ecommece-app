'use client';

import React from 'react';
import Link from 'next/link';

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: 'Fruits & Vegetables',
      icon: '🥕',
      color: 'bg-green-100',
      hoverColor: 'hover:bg-green-200',
    },
    {
      id: 2,
      name: 'Dairy & Bakery',
      icon: '🥛',
      color: 'bg-blue-100',
      hoverColor: 'hover:bg-blue-200',
    },
    {
      id: 3,
      name: 'Meat & Seafood',
      icon: '🐟',
      color: 'bg-red-100',
      hoverColor: 'hover:bg-red-200',
    },
    {
      id: 4,
      name: 'Beverages',
      icon: '🥤',
      color: 'bg-yellow-100',
      hoverColor: 'hover:bg-yellow-200',
    },
    {
      id: 5,
      name: 'Breakfast & Cereal',
      icon: '🥣',
      color: 'bg-orange-100',
      hoverColor: 'hover:bg-orange-200',
    },
    {
      id: 6,
      name: 'Frozen Foods',
      icon: '❄️',
      color: 'bg-cyan-100',
      hoverColor: 'hover:bg-cyan-200',
    },
    {
      id: 7,
      name: 'Biscuits & Snacks',
      icon: '🍪',
      color: 'bg-amber-100',
      hoverColor: 'hover:bg-amber-200',
    },
    {
      id: 8,
      name: 'Grocery & Staples',
      icon: '🌾',
      color: 'bg-lime-100',
      hoverColor: 'hover:bg-lime-200',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Categories</h2>
          <p className="text-gray-600">
            Choose your necessary products from our featured categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
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
