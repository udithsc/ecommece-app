import React from 'react';
import Link from 'next/link';
import { AiFillInstagram, AiOutlineTwitter, AiFillFacebook, AiFillYoutube } from 'react-icons/ai';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">Subscribe to our Newsletter</h3>
              <p className="text-green-100">
                Get all the latest information on Events, Sales and Offers.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 md:w-80 px-4 py-3 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button className="bg-white text-primary px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-6">UDT Store</h3>
              <p className="text-gray-300 mb-6">
                Your one-stop destination for fresh groceries and daily essentials. We provide
                quality products at affordable prices.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FiMapPin className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">123 Main Street, City, State 12345</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiPhone className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">+1 (800) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiMail className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">info@udtstore.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Customer Service</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/shipping"
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link
                    href="/size-guide"
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/track-order"
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    Track Your Order
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Follow Us</h4>
              <p className="text-gray-300 mb-6">
                Stay connected with us on social media for updates and offers.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                >
                  <AiFillFacebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                >
                  <AiOutlineTwitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                >
                  <AiFillInstagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                >
                  <AiFillYoutube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 UDT Store. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-gray-300 hover:text-primary text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-300 hover:text-primary text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <div className="flex space-x-2">
                <img
                  src="/public/a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555.webp"
                  alt="Payment"
                  className="h-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
