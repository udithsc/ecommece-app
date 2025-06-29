'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { AiOutlineGift, AiOutlinePhone, AiOutlinePercentage } from 'react-icons/ai';
import { FiShield } from 'react-icons/fi';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const storeLocations = [
    {
      city: 'New York',
      address: '1234 Broadway Street, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'newyork@udtstore.com',
      hours: 'Mon-Fri: 9:00 AM - 8:00 PM'
    },
    {
      city: 'Los Angeles',
      address: '5678 Sunset Boulevard, CA 90028',
      phone: '+1 (555) 987-6543',
      email: 'la@udtstore.com',
      hours: 'Mon-Fri: 9:00 AM - 8:00 PM'
    }
  ];

  const features = [
    {
      icon: <AiOutlinePercentage className="w-8 h-8" />,
      title: 'Best Prices & Offers',
      description: 'Cheaper Prices Than Your Local Supermarket'
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: '100% Return Policy',
      description: 'Easy Return Within 30 Days'
    },
    {
      icon: <AiOutlinePhone className="w-8 h-8" />,
      title: 'Support 24/7',
      description: 'Contact us 24 hours a day, 7 days a week'
    },
    {
      icon: <AiOutlineGift className="w-8 h-8" />,
      title: 'Great Offer Daily Deal',
      description: 'When you sign up, you get our awesome offers'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">Contact</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Ask Us Question</h1>
          <p className="text-green-100 text-lg">
            We&apos;re here to help! Get in touch with us for any questions or support you need.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Choose a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="order">Order Issue</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            {/* Store Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {storeLocations.map((location, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{location.city} Store</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <FiMapPin className="w-5 h-5 text-primary mt-1" />
                      <span className="text-gray-600 text-sm">{location.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiPhone className="w-5 h-5 text-primary" />
                      <span className="text-gray-600 text-sm">{location.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiMail className="w-5 h-5 text-primary" />
                      <span className="text-gray-600 text-sm">{location.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiClock className="w-5 h-5 text-primary" />
                      <span className="text-gray-600 text-sm">{location.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6976701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-primary rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-green-100 mb-6">
            Our customer support team is available 24/7 to help you with any questions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:+15551234567"
              className="bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold inline-flex items-center space-x-2"
            >
              <FiPhone className="w-5 h-5" />
              <span>Call Us Now</span>
            </a>
            <a
              href="mailto:support@udtstore.com"
              className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors font-semibold inline-flex items-center space-x-2"
            >
              <FiMail className="w-5 h-5" />
              <span>Email Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;