import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineMenu, AiOutlineRight } from 'react-icons/ai';
import { FiTruck, FiHeadphones, FiShield, FiRefreshCw } from 'react-icons/fi';

const HeroBanner = () => {
  const categories = [
    { name: 'Laptops', icon: '💻' },
    { name: 'Smartphones', icon: '📱' },
    { name: 'Audio', icon: '🎧' },
    { name: 'Peripherals', icon: '🖱️' },
    { name: 'Storage', icon: '💾' },
    { name: 'Wearables', icon: '⌚' },
    { name: 'Accessories', icon: '🔌' },
    { name: 'Networking', icon: '📡' },
  ];

  const services = [
    {
      icon: <FiTruck className="w-12 h-12" />,
      title: 'Free Shipping',
      subtitle: 'Free shipping with discount',
    },
    {
      icon: <FiHeadphones className="w-12 h-12" />,
      title: 'Great Support 24/7',
      subtitle: 'Instant access to Contact',
    },
    {
      icon: <FiShield className="w-12 h-12" />,
      title: '100% Secure',
      subtitle: 'We ensure your money is safe',
    },
    {
      icon: <FiRefreshCw className="w-12 h-12" />,
      title: 'Money-Back',
      subtitle: '30 days money-back',
    },
  ];

  return (
    <div>
      {/* Main Hero Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 py-4 lg:py-8">
            {/* Categories Sidebar - Hidden on mobile, shown on lg+ */}
            <div className="hidden lg:block w-80 bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-primary">
                <div className="flex items-center space-x-2 text-white">
                  <AiOutlineMenu className="w-5 h-5" />
                  <span className="font-semibold">All Categories</span>
                </div>
              </div>
              <div className="p-2">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/shop?category=${encodeURIComponent(category.name.toLowerCase())}`}
                    className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-200 border-b border-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                    <AiOutlineRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Categories - Horizontal scroll */}
            <div className="lg:hidden mb-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="flex overflow-x-auto space-x-3 pb-2">
                  {categories.slice(0, 6).map((category, index) => (
                    <Link
                      key={index}
                      href={`/shop?category=${encodeURIComponent(category.name.toLowerCase())}`}
                      className="flex-shrink-0 text-center p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-colors min-w-[80px]"
                    >
                      <div className="text-2xl mb-1">{category.icon}</div>
                      <div className="text-xs font-medium">{category.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Banner */}
            <div className="flex-1 bg-gradient-to-r from-green-100 via-green-50 to-orange-50 rounded-lg overflow-hidden relative">
              <div className="flex flex-col md:flex-row min-h-[300px] md:h-96">
                <div className="flex-1 p-6 md:p-12 flex flex-col justify-center text-center md:text-left">
                  <div className="text-sm text-primary font-medium mb-2">
                    Best Deals on Electronics
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    Get up to
                    <br />
                    <span className="text-primary">-50% off</span>
                  </h1>
                  <p className="text-gray-600 mb-6 text-sm md:text-base">
                    Don&apos;t miss out on our amazing tech deals!
                    <br className="hidden md:block" />
                    High-quality products at unbeatable prices.
                  </p>
                  <Link href="/shop">
                    <button className="bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold inline-flex items-center justify-center">
                      Shop Now
                      <AiOutlineRight className="ml-2 w-4 h-4" />
                    </button>
                  </Link>
                </div>
                <div className="flex-1 relative min-h-[200px] md:min-h-0">
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <Image
                      src="/a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555.webp"
                      alt="Featured Products"
                      width={555}
                      height={555}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  {/* Floating Price Tag */}
                  <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white rounded-full p-3 md:p-4 shadow-lg">
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Only</div>
                      <div className="text-lg md:text-xl font-bold text-primary">$199</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Area */}
      <div className="bg-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className="p-3 md:p-4 bg-gray-100 rounded-full text-primary">
                    <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
                      {React.cloneElement(service.icon, { 
                        className: "w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12" 
                      })}
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-sm md:text-lg text-gray-900 mb-1 md:mb-2">{service.title}</h4>
                <p className="text-xs md:text-sm text-gray-600">{service.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
