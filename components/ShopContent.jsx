'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { HiOutlineViewGrid, HiOutlineViewList } from 'react-icons/hi';
import { BsFilter } from 'react-icons/bs';

const ShopContent = ({ products }) => {
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(products?.map((p) => p.category) || [])];
    return cats;
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products || [];

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === filterCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, filterCategory, priceRange, sortBy]);

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

  const ProductCard = ({ product, isListView = false }) => (
    <div
      className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ${isListView ? 'flex' : ''}`}
    >
      <div className={`relative ${isListView ? 'flex-shrink-0' : ''}`}>
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
          <img
            src={product.image[0]}
            alt={product.name}
            className={`object-cover cursor-pointer hover:scale-105 transition-transform duration-300 ${
              isListView ? 'w-48 h-48' : 'w-full h-64'
            }`}
          />
        </Link>
      </div>

      <div className={`p-4 ${isListView ? 'flex-1' : ''}`}>
        <Link href={`/product/${product.slug}`}>
          <h3
            className={`font-medium text-gray-900 mb-2 hover:text-green-600 cursor-pointer ${
              isListView ? 'text-lg' : 'text-sm'
            }`}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex space-x-1">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
        </div>

        {isListView && <p className="text-gray-600 mb-3">{product.details}</p>}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`font-bold text-gray-900 ${isListView ? 'text-xl' : 'text-lg'}`}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-sm text-green-600 font-medium">{product.category}</span>
        </div>
      </div>
    </div>
  );

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
            <span className="text-gray-900">Shop</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filterCategory === category}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm capitalize">
                        {category === 'all' ? 'All Categories' : category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-3">
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>$0</span>
                      <span>${priceRange.max}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg"
                  >
                    <BsFilter />
                    Filters
                  </button>
                  <span className="text-gray-600">
                    Showing {filteredAndSortedProducts.length} products
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* View Mode Toggle */}
                  <div className="flex border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600'}`}
                    >
                      <HiOutlineViewGrid />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600'}`}
                    >
                      <HiOutlineViewList />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
              }
            >
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} isListView={viewMode === 'list'} />
              ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopContent;
