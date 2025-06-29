'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineUser, AiOutlineSearch, AiOutlineMenu, AiOutlineClose, AiOutlineHeart } from 'react-icons/ai';
import { FiPhone } from 'react-icons/fi';
import Image from 'next/image';

import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const { wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-100 py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 text-gray-600">
            <span>About Us</span>
            <span>Contacts</span>
            <span>Store Location</span>
            <span>Track Order</span>
            <span>Blog</span>
          </div>
          <div className="flex items-center space-x-4 text-gray-600">
            <span>My Account</span>
            <span>Currency: USD</span>
            <span>Language: EN</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="text-2xl font-bold text-gray-900">UDT STORE</div>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search over 10,000 products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <AiOutlineSearch className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-6">
              {/* Customer Service */}
              <div className="flex items-center space-x-2 text-gray-600">
                <FiPhone className="w-5 h-5" />
                <div className="text-sm">
                  <div className="text-xs">Customer Service</div>
                  <div className="font-semibold">(800) 060-0730</div>
                </div>
              </div>

              {/* Cart */}
              <button 
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                <AiOutlineShopping className="w-6 h-6" />
                {totalQuantities > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalQuantities}
                  </span>
                )}
              </button>

              {/* User */}
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <AiOutlineUser className="w-6 h-6" />
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600"
              >
                {isMobileMenuOpen ? <AiOutlineClose className="w-6 h-6" /> : <AiOutlineMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-14">
            {/* Main Navigation */}
            <nav className="hidden md:flex items-center space-x-8 text-white">
              <Link href="/" className="hover:text-green-200 transition-colors font-medium">Home</Link>
              <Link href="/shop" className="hover:text-green-200 transition-colors font-medium">Shop</Link>
              <Link href="/account" className="hover:text-green-200 transition-colors font-medium">Account</Link>
              <Link href="/about" className="hover:text-green-200 transition-colors font-medium">About Us</Link>
              <Link href="/contact" className="hover:text-green-200 transition-colors font-medium">Contact</Link>
              <Link href="/blog" className="hover:text-green-200 transition-colors font-medium">Blog</Link>
            </nav>

            {/* Right Side Info */}
            <div className="hidden md:flex items-center space-x-6 ml-auto text-white">
              <div className="text-sm">
                <span>Need help? Call Us: </span>
                <span className="font-semibold">+ 1800 900</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/wishlist" className="flex items-center space-x-1 hover:text-green-200">
                  <AiOutlineHeart className="w-5 h-5" />
                  <span className="text-sm">{wishlistCount}</span>
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/account" className="hover:text-green-200">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <Link href="/" className="block py-2 text-gray-900">Home</Link>
            <Link href="/shop" className="block py-2 text-gray-900">Shop</Link>
            <Link href="/account" className="block py-2 text-gray-900">Account</Link>
            <Link href="/blog" className="block py-2 text-gray-900">Blog</Link>
          </div>
        </div>
      )}

      {showCart && <Cart />}
    </>
  );
};

export default Navbar;
