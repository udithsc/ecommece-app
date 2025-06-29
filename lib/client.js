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
    name: 'Electric Planer Handy',
    slug: 'electric-planer-handy',
    price: 749.0,
    originalPrice: 849.0,
    image: ['/earphones_a_1.webp', '/earphones_a_2.webp'],
    details: 'High-quality electric planer for professional woodworking',
    featured: true,
    category: 'Power Tools',
    rating: 4.5,
    reviews: 12,
    inStock: true,
    badges: ['SALE'],
  },
  {
    _id: '2',
    name: 'Handheld Tool Black',
    slug: 'handheld-tool-black',
    price: 1519.0,
    image: ['/earphones_b_1.webp', '/earphones_b_2.webp'],
    details: 'Professional handheld tool for precision work',
    featured: true,
    category: 'Hand Tools',
    rating: 5.0,
    reviews: 8,
    inStock: true,
    badges: ['HOT'],
  },
  {
    _id: '3',
    name: 'Drill Screwdriver Bundle',
    slug: 'drill-screwdriver-bundle',
    price: 850.0,
    image: ['/headphones_a_1.webp', '/headphones_a_2.webp'],
    details: 'Complete drill and screwdriver bundle for all your needs',
    featured: true,
    category: 'Power Tools',
    rating: 4.8,
    reviews: 15,
    inStock: true,
    badges: [],
  },
  {
    _id: '4',
    name: 'Drill Series 3 Handy',
    slug: 'drill-series-3-handy',
    price: 949.0,
    originalPrice: 1149.0,
    image: ['/headphones_b_1.webp', '/headphones_b_2.webp'],
    details: 'Latest series drill with advanced features',
    featured: true,
    category: 'Power Tools',
    rating: 4.7,
    reviews: 22,
    inStock: true,
    badges: ['SALE'],
  },
  {
    _id: '5',
    name: 'Professional Speaker Set',
    slug: 'professional-speaker-set',
    price: 299.0,
    image: ['/speaker1.webp', '/speaker2.webp'],
    details: 'High-quality speakers for professional audio',
    featured: false,
    category: 'Audio',
    rating: 4.6,
    reviews: 18,
    inStock: true,
    badges: [],
  },
  {
    _id: '6',
    name: 'Smart Watch Pro',
    slug: 'smart-watch-pro',
    price: 199.0,
    image: ['/watch_1.webp', '/watch_2.webp'],
    details: 'Advanced smartwatch with health monitoring',
    featured: false,
    category: 'Electronics',
    rating: 4.4,
    reviews: 25,
    inStock: true,
    badges: [],
  },
];

const mockBanners = [
  {
    _id: 'banner1',
    // Hero Banner properties
    title: 'Big Stock of Building Materials',
    subtitle: 'Hammers, Screwdrivers, Universal Tool Box, Pliers, Saws',
    smallText: 'Small Text',
    midText: 'Big Stock of Building Materials',
    largeText1: 'TOOLS',
    desc: 'Hammers, Screwdrivers, Universal Tool Box, Pliers, Saws',
    buttonText: 'Shop Now',
    image: '/a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555.webp',
    link: '/shop',
    product: 'electric-planer-handy',
    // Footer Banner properties
    discount: '20% OFF',
    largeText2: 'EQUIPMENT',
    saleTime: 'LIMITED TIME',
  },
];
