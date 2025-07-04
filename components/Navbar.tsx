'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AiOutlineShopping,
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHeart,
} from 'react-icons/ai';
import { FiPhone } from 'react-icons/fi';
import Image from 'next/image';

import useCartStore from '../stores/cartStore';
import { useWishlistCount } from '../stores/wishlistStore';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { totalQuantities } = useCartStore();
  const wishlistCount: number = useWishlistCount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleMenuToggle = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-100 py-2 text-sm hidden md:block">
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
                <AiOutlineShopping className="w-12 h-12 ml-2" />
                <div className="text-2xl font-bold text-gray-900">UDT STORE</div>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search over 10,000 products"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <AiOutlineSearch className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2 md:space-x-6">
              {/* Customer Service - Hidden on mobile */}
              <div className="hidden lg:flex items-center space-x-2 text-gray-600">
                <FiPhone className="w-5 h-5" />
                <div className="text-sm">
                  <div className="text-xs">Customer Service</div>
                  <div className="font-semibold">(800) 060-0730</div>
                </div>
              </div>

              {/* Search Button for Mobile */}
              <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
                <AiOutlineSearch className="w-6 h-6" />
              </button>

              {/* Wishlist - Mobile */}
              <Link
                href="/wishlist"
                className="md:hidden relative p-2 text-gray-600 hover:text-gray-900"
              >
                <AiOutlineHeart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900">
                <AiOutlineShopping className="w-6 h-6" />
                {totalQuantities > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalQuantities}
                  </span>
                )}
              </Link>

              {/* User */}
              <Link
                href="/account"
                className="hidden md:block p-2 text-gray-600 hover:text-gray-900"
              >
                <AiOutlineUser className="w-6 h-6" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={handleMenuToggle}
                className="md:hidden p-2 text-gray-600"
              >
                {isMobileMenuOpen ? (
                  <AiOutlineClose className="w-6 h-6" />
                ) : (
                  <AiOutlineMenu className="w-6 h-6" />
                )}
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
              <Link href="/" className="hover:text-green-200 transition-colors font-medium">
                Home
              </Link>
              <Link href="/shop" className="hover:text-green-200 transition-colors font-medium">
                Shop
              </Link>
              <Link href="/account" className="hover:text-green-200 transition-colors font-medium">
                Account
              </Link>
              <Link href="/about" className="hover:text-green-200 transition-colors font-medium">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-green-200 transition-colors font-medium">
                Contact
              </Link>
              <Link href="/blog" className="hover:text-green-200 transition-colors font-medium">
                Blog
              </Link>
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
                <Link href="/account" className="hover:text-green-200">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          {/* Mobile Search */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <AiOutlineSearch className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="px-4 py-2 space-y-1">
            <Link
              href="/"
              className="block py-3 px-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={handleMenuClose}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="block py-3 px-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={handleMenuClose}
            >
              Shop
            </Link>
            <Link
              href="/account"
              className="block py-3 px-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={handleMenuClose}
            >
              Account
            </Link>
            <Link
              href="/about"
              className="block py-3 px-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={handleMenuClose}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block py-3 px-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={handleMenuClose}
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="block py-3 px-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={handleMenuClose}
            >
              Blog
            </Link>
          </div>

          {/* Mobile User Actions */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <Link
                href="/wishlist"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                onClick={handleMenuClose}
              >
                <AiOutlineHeart className="w-5 h-5" />
                <span>Wishlist ({wishlistCount})</span>
              </Link>
              <Link
                href="/account"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                onClick={handleMenuClose}
              >
                <AiOutlineUser className="w-5 h-5" />
                <span>Login</span>
              </Link>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <div>
                Customer Service: <span className="font-semibold">(800) 060-0730</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;