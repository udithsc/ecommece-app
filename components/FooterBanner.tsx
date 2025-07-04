import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineRight } from 'react-icons/ai';

interface FooterBannerData {
  discount?: string;
  largeText1?: string;
  largeText2?: string;
  saleTime?: string;
  smallText?: string;
  midText?: string;
  desc?: string;
  product?: string;
  buttonText?: string;
  image?: string;
}

interface FooterBannerProps {
  footerBanner: FooterBannerData;
}

const FooterBanner: React.FC<FooterBannerProps> = ({
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
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center min-h-[400px]">
            {/* Left Side - Content */}
            <div className="flex-1 p-6 md:p-8 lg:p-12">
              <div className="text-center md:text-left space-y-6">
                {/* Small Text */}
                {smallText && (
                  <p className="text-sm text-gray-500 uppercase tracking-wide">{smallText}</p>
                )}

                {/* Discount Badge */}
                {discount && (
                  <div>
                    <span className="text-sm font-medium text-primary bg-primary bg-opacity-10 px-3 py-1 rounded-full inline-block">
                      {discount}
                    </span>
                  </div>
                )}

                {/* Main Headings */}
                <div className="space-y-2">
                  {largeText1 && (
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                      {largeText1}
                    </h3>
                  )}
                  {largeText2 && (
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                      {largeText2}
                    </h3>
                  )}
                  {midText && (
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">{midText}</h3>
                  )}
                </div>

                {/* Description */}
                {desc && (
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{desc}</p>
                )}

                {/* Sale Time */}
                {saleTime && <p className="text-lg text-gray-600 font-medium">{saleTime}</p>}

                {/* Button */}
                {buttonText && (
                  <div>
                    <Link href={product ? `/product/${product}` : '/shop'}>
                      <button className="bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-primary hover:bg-opacity-90 transition-colors duration-200 font-semibold inline-flex items-center group">
                        {buttonText}
                        <AiOutlineRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Image */}
            {image && (
              <div className="flex-1 md:flex-shrink-0 md:w-auto lg:w-96 p-6 md:p-8">
                <div className="relative flex justify-center">
                  <Image
                    src={
                      image.startsWith('//')
                        ? `https:${image}`
                        : image.startsWith('/')
                          ? image
                          : `/${image}`
                    }
                    alt="footer-banner"
                    width={400}
                    height={400}
                    className="w-full max-w-sm h-auto object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterBanner;