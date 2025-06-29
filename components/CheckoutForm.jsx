'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';

const CheckoutForm = () => {
  const { cartItems, totalPrice, totalQuantities } = useStateContext();
  const [selectedPayment, setSelectedPayment] = useState('bank-transfer');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    // Handle form submission
    console.log('Processing order...');
  };

  const subtotal = totalPrice;
  const shipping = 25.0;
  const tax = subtotal * 0.2; // 20% tax
  const total = subtotal + shipping + tax;

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
            <Link href="/cart" className="text-gray-500 hover:text-gray-700">
              Shopping Cart
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Login Prompt */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-blue-800">
            Returning customer?
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
              Click here to login
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Billing Details */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Company Name"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a country...</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="au">Australia</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Street Address"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apartment, suite, unit etc. (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Apartment, suite, unit etc."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Town / City
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Town / City"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State / County
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="State / County"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postcode / ZIP
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Postcode / ZIP"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent"
                      placeholder="Phone"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Create an account?</span>
                  </label>
                </div>

                {/* Shipping Details */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Details</h3>
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Ship to a different address?</span>
                  </label>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Order notes (Optional)
                  </h3>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Notes about your order, e.g. special notes for delivery."
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Order</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="font-medium text-gray-700">Product</span>
                    <span className="font-medium text-gray-700">Total</span>
                  </div>

                  {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">× {item.quantity}</p>
                      </div>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="bank-transfer"
                      name="payment"
                      value="bank-transfer"
                      checked={selectedPayment === 'bank-transfer'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="text-primary focus:ring-[#629D23]"
                    />
                    <label
                      htmlFor="bank-transfer"
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      Direct bank transfer
                    </label>
                  </div>

                  {selectedPayment === 'bank-transfer' && (
                    <div className="ml-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Make your payment directly into our bank account. Please use your Order ID
                        as the payment reference. Your order will not be shipped until the funds
                        have cleared in our account.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="check-payments"
                      name="payment"
                      value="check-payments"
                      checked={selectedPayment === 'check-payments'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="text-primary focus:ring-[#629D23]"
                    />
                    <label
                      htmlFor="check-payments"
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      Check payments
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cash-on-delivery"
                      name="payment"
                      value="cash-on-delivery"
                      checked={selectedPayment === 'cash-on-delivery'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="text-primary focus:ring-[#629D23]"
                    />
                    <label
                      htmlFor="cash-on-delivery"
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      Cash on delivery
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="paypal"
                      name="payment"
                      value="paypal"
                      checked={selectedPayment === 'paypal'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="text-primary focus:ring-[#629D23]"
                    />
                    <label htmlFor="paypal" className="ml-2 text-sm font-medium text-gray-700">
                      PayPal
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500 mt-1"
                      required
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I have read and agree to the website{' '}
                      <Link href="/terms" className="text-green-600 hover:text-green-700">
                        terms and conditions
                      </Link>
                      *
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
