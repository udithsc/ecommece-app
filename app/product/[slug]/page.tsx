import { getProduct, getProducts } from '../../../lib/client';
import { Layout } from '../../../components';
import ProductDetail from '../../../components/ProductDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product: any) => ({
    slug: product.slug,
  }));
}

async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const products = await getProducts();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Layout>
      <ProductDetail product={product} products={products} />
    </Layout>
  );
}

export default ProductPage;
