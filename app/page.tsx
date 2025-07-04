import { getProductsServer } from '../lib/server-actions';
import { getBanners } from '../lib/client';
import Layout from '../components/Layout';
import HeroBanner from '../components/HeroBanner';
import FeaturedProducts from '../components/FeaturedProducts';
import CategorySection from '../components/CategorySection';
import BestSellers from '../components/BestSellers';
import PromoBanner from '../components/PromoBanner';
import FooterBanner from '../components/FooterBanner';

async function HomePage() {
  const products = await getProductsServer();
  const bannerData = await getBanners();

  return (
    <Layout>
      <HeroBanner heroBanner={bannerData.length > 0 ? bannerData[0] : undefined} />
      <FeaturedProducts products={products} />
      <CategorySection />
      <PromoBanner />
      <BestSellers products={products} />
      <FooterBanner footerBanner={bannerData.length > 0 ? bannerData[0] : undefined} />
    </Layout>
  );
}

export default HomePage;
