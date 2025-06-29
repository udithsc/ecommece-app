import { getProducts } from '../../lib/client'
import { Layout } from '../../components'
import ShopContent from '../../components/ShopContent'

async function ShopPage() {
  const products = await getProducts()

  return (
    <Layout>
      <ShopContent products={products} />
    </Layout>
  )
}

export default ShopPage