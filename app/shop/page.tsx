import { Suspense } from 'react';
import { getProducts } from '../../lib/client';
import { Layout } from '../../components';
import ShopContent from '../../components/ShopContent';

async function ShopPage() {
  const products = await getProducts();

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
        }
      >
        <ShopContent products={products} />
      </Suspense>
    </Layout>
  );
}

export default ShopPage;
