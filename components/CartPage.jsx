'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose, AiOutlineGift } from 'react-icons/ai';
import { FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { useStateContext } from '../context/StateContext';

const CartPage = () => {
  const { cartItems, totalPrice, totalQuantities, onRemove, toggleCartItemQuanitity } = useStateContext();
  const [couponCode, setCouponCode] = useState('');

  const shippingCost = 25.00;
  const tax = totalPrice * 0.08;
  const discount = 0; // Apply coupon discount here
  const finalTotal = totalPrice + shippingCost + tax - discount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">Cart</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-8">
              <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 1.68M7 13l4.32 4.32M17 17a2 2 0 11-4 0 2 2 0 014 0zM9 17a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven&apos;t added any items to your cart yet.</p>
            <Link href="/shop">
              <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {/* Cart Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                    <span className="text-gray-600">{totalQuantities} items</span>
                  </div>
                </div>
                
                {/* Cart Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-700">Product</th>
                        <th className="text-center p-4 font-medium text-gray-700">Quantity</th>
                        <th className="text-right p-4 font-medium text-gray-700">Price</th>
                        <th className="text-right p-4 font-medium text-gray-700">Total</th>
                        <th className="p-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                <img 
                                  src={item.image[0]} 
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900 hover:text-primary cursor-pointer">
                                  <Link href={`/product/${item.slug}`}>
                                    {item.name}
                                  </Link>
                                </h3>
                                <p className="text-sm text-gray-500">In Stock</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center space-x-2">
                              <button 
                                onClick={() => toggleCartItemQuanitity(item._id, 'dec')}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                <AiOutlineMinus className="w-3 h-3" />
                              </button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <button 
                                onClick={() => toggleCartItemQuanitity(item._id, 'inc')}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                <AiOutlinePlus className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
                          </td>
                          <td className="p-4 text-right">
                            <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                          </td>
                          <td className="p-4">
                            <button 
                              onClick={() => onRemove(item)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <AiOutlineClose className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Cart Actions */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <Link href="/shop">
                      <button className="text-primary hover:text-green-700 font-medium">
                        ← Continue Shopping
                      </button>
                    </Link>
                    <button 
                      onClick={() => cartItems.forEach(item => onRemove(item))}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Summary Sidebar */}
            <div className="space-y-6">
              {/* Coupon Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <AiOutlineGift className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-gray-900">Coupon Discount</h3>
                </div>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Apply Coupon
                  </button>
                </div>
              </div>

              {/* Cart Totals */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Cart Totals</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold text-primary">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Link href="/checkout">
                  <button className="w-full bg-primary text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg mt-6">
                    Proceed To Checkout
                  </button>
                </Link>
              </div>

              {/* Benefits Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Why Shop With Us?</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FiTruck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Free Shipping</h4>
                      <p className="text-sm text-gray-600">On orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FiRefreshCw className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">100% Return Policy</h4>
                      <p className="text-sm text-gray-600">30 days money back</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FiShield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Secure Payment</h4>
                      <p className="text-sm text-gray-600">100% secure checkout</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;