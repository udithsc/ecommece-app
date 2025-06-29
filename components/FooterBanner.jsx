import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineRight } from 'react-icons/ai';

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  },
}) => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-green-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Side - Main Content */}
            <div className="flex-1 p-8 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div className="space-y-4">
                  <p className="text-sm font-medium text-primary bg-green-100 px-3 py-1 rounded-full inline-block">
                    {discount}
                  </p>
                  <div className="space-y-2">
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">{largeText1}</h3>
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">{largeText2}</h3>
                  </div>
                  <p className="text-lg text-gray-600 font-medium">{saleTime}</p>
                </div>

                {/* Right Content */}
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 uppercase tracking-wide">{smallText}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{midText}</h3>
                  <p className="text-gray-600 leading-relaxed">{desc}</p>
                  <Link href={`/product/${product}`}>
                    <button className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold inline-flex items-center group">
                      {buttonText}
                      <AiOutlineRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex-shrink-0 lg:w-96 p-8">
              <div className="relative">
                <Image
                  src={image}
                  alt="footer-banner"
                  width={555}
                  height={555}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterBanner;
