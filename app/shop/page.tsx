import { Suspense } from 'react';
import { getProductsServer } from '../../lib/server-actions';
import Layout from '../../components/Layout';
import ShopContent from '../../components/ShopContent';

async function ShopPage() {
  const products = await getProductsServer();

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
