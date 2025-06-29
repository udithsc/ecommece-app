// Local data store functions
export const getProducts = async () => {
  return mockProducts;
};

export const getProduct = async (slug) => {
  return mockProducts.find((product) => product.slug === slug);
};

export const getFeaturedProducts = async () => {
  return mockProducts.filter((product) => product.featured);
};

export const getBanners = async () => {
  return mockBanners;
};

// Mock product data
const mockProducts = [
  {
    _id: '1',
    name: 'Gaming Laptop X1',
    slug: 'gaming-laptop-x1',
    price: 1499.0,
    originalPrice: 1699.0,
    image: ['/headphones_a_1.webp', '/headphones_a_2.webp'],
    details: 'High-performance gaming laptop with RTX 3080 and 144Hz display.',
    featured: true,
    category: 'Laptops',
    rating: 4.8,
    reviews: 25,
    inStock: true,
    badges: ['SALE'],
  },
  {
    _id: '2',
    name: 'Smartphone Pro Max',
    slug: 'smartphone-pro-max',
    price: 999.0,
    image: ['/earphones_b_1.webp', '/earphones_b_2.webp'],
    details: 'Flagship smartphone with A15 Bionic chip and ProMotion display.',
    featured: true,
    category: 'Smartphones',
    rating: 4.9,
    reviews: 40,
    inStock: true,
    badges: ['HOT'],
  },
  {
    _id: '3',
    name: 'Wireless Earbuds Elite',
    slug: 'wireless-earbuds-elite',
    price: 199.0,
    image: ['/earphones_a_1.webp', '/earphones_a_2.webp'],
    details: 'Premium wireless earbuds with active noise cancellation and spatial audio.',
    featured: true,
    category: 'Audio',
    rating: 4.7,
    reviews: 30,
    inStock: true,
    badges: [],
  },
  {
    _id: '4',
    name: 'Mechanical Keyboard RGB',
    slug: 'mechanical-keyboard-rgb',
    price: 129.0,
    originalPrice: 149.0,
    image: ['/headphones_b_1.webp', '/headphones_b_2.webp'],
    details: 'Customizable RGB mechanical keyboard with hot-swappable switches.',
    featured: true,
    category: 'Peripherals',
    rating: 4.6,
    reviews: 18,
    inStock: true,
    badges: ['SALE'],
  },
  {
    _id: '5',
    name: 'External SSD 1TB',
    slug: 'external-ssd-1tb',
    price: 150.0,
    image: ['/speaker1.webp', '/speaker2.webp'],
    details: 'High-speed 1TB external SSD for fast data transfer and backup.',
    featured: false,
    category: 'Storage',
    rating: 4.5,
    reviews: 10,
    inStock: true,
    badges: [],
  },
  {
    _id: '6',
    name: 'Smartwatch Series 7',
    slug: 'smartwatch-series-7',
    price: 399.0,
    image: ['/watch_1.webp', '/watch_2.webp'],
    details: 'Latest smartwatch with advanced health tracking and always-on display.',
    featured: false,
    category: 'Wearables',
    rating: 4.7,
    reviews: 28,
    inStock: true,
    badges: [],
  },
];

const mockBanners = [
  {
    _id: 'banner1',
    // Hero Banner properties
    title: 'Latest Tech Gadgets',
    subtitle: 'Laptops, Smartphones, Wearables, and more!',
    smallText: 'New Arrivals',
    midText: 'Explore Our Collection',
    largeText1: 'ELECTRONICS',
    desc: 'Discover the best in computers and mobile technology.',
    buttonText: 'Shop Tech',
    image: '/a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555.webp',
    link: '/shop',
    product: 'gaming-laptop-x1',
    // Footer Banner properties
    discount: 'Up to 50% OFF',
    largeText2: 'GADGETS',
    saleTime: 'Limited Time Offer',
  },
];
