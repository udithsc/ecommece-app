import { getProducts, getBanners } from '../lib/client'
import { 
  Layout, 
  HeroBanner, 
  FeaturedProducts, 
  CategorySection, 
  BestSellers, 
  PromoBanner, 
  FooterBanner 
} from '../components'

async function HomePage() {
  const products = await getProducts()
  const bannerData = await getBanners()

  return (
    <Layout>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <FeaturedProducts products={products} />
      <CategorySection />
      <PromoBanner />
      <BestSellers products={products} />
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </Layout>
  )
}

export default HomePage