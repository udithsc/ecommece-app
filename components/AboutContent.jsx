'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AiOutlineShoppingCart,
  AiOutlineReload,
  AiOutlineCustomerService,
  AiOutlineGift,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
} from 'react-icons/ai';
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';

const AboutContent = () => {
  const services = [
    {
      icon: <AiOutlineShoppingCart className="w-12 h-12" />,
      title: 'Organic Food Services',
      description:
        'Fresh and organic products sourced directly from local farms, ensuring the highest quality and nutritional value for your family.',
    },
    {
      icon: <AiOutlineReload className="w-12 h-12" />,
      title: '100% Return Policy',
      description:
        'Not satisfied with your purchase? We offer a hassle-free 100% money-back guarantee within 30 days of purchase.',
    },
    {
      icon: <AiOutlineCustomerService className="w-12 h-12" />,
      title: '24/7 Support',
      description:
        'Our dedicated customer support team is available round the clock to assist you with any queries or concerns.',
    },
    {
      icon: <AiOutlineGift className="w-12 h-12" />,
      title: 'Great Daily Offers',
      description:
        'Enjoy amazing discounts and special deals every day on a wide range of products across all categories.',
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Samuel Alexander',
      title: 'Design Director',
      phone: '+1 (555) 123-4567',
      image: '/team-member-1.jpg',
    },
    {
      id: 2,
      name: 'Isabella Charlotte',
      title: 'Design Director',
      phone: '+1 (555) 234-5678',
      image: '/team-member-2.jpg',
    },
    {
      id: 3,
      name: 'William Ethan',
      title: 'Design Director',
      phone: '+1 (555) 345-6789',
      image: '/team-member-3.jpg',
    },
    {
      id: 4,
      name: 'Sophia Amelia',
      title: 'Design Director',
      phone: '+1 (555) 456-7890',
      image: '/team-member-4.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">About Us</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Do You Want To Know Us?
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
            ullamcorper mattis, pulvinar dapibus leo. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <p>About Company Image</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Your Destination for Quality Produce and Pantry Essentials
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                ullamcorper mattis, pulvinar dapibus leo. Sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">Fresh and organic produce</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">Pantry essentials and staples</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">Fast and reliable delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">Competitive pricing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">Excellent customer service</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">Sustainable and eco-friendly practices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why You Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                01
              </div>
              <AiOutlineShoppingCart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Best Quality Products</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                ullamcorper mattis.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                02
              </div>
              <AiOutlineCustomerService className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Customer Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                ullamcorper mattis.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                03
              </div>
              <AiOutlineReload className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Returns</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                ullamcorper mattis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Prices & Offers</h3>
              <p className="text-gray-600 text-sm">
                We offer competitive prices on all our products without compromising on quality.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AiOutlineReload className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Return Policy</h3>
              <p className="text-gray-600 text-sm">
                30-day hassle-free return policy for all products with no questions asked.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeadphones className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support 24/7</h3>
              <p className="text-gray-600 text-sm">
                Round-the-clock customer support to help you with any queries or concerns.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AiOutlineGift className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Great Offer Daily Deal</h3>
              <p className="text-gray-600 text-sm">
                Enjoy amazing discounts and special deals every day on a wide range of products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm">Team Photo</p>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{member.title}</p>
                  <p className="text-primary text-sm font-medium">{member.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutContent;
