import { Divider, Space } from '@mantine/core';
import type { NextPage } from 'next';
import { FeaturesSection } from '../components/Home/FeaturesSection';
import { HeroSection } from '../components/Home/HeroSection';
import { ProductsCarousel } from '../components/Home/ProductsCarousel';
import { getProducts, ProductResponse } from '../utils/api/products';

type HomeProps = { productsResponse: ProductResponse | null};

const Home: NextPage<HomeProps> = ({ productsResponse }) => {
  const products = productsResponse?.data || [];

  return (
    <>
      <HeroSection />
      <Space h="md" />
      <ProductsCarousel products={products}/>
      <Divider my="sm" />
      <FeaturesSection />
    </>
  )
}

export async function getStaticProps() {
  const productsResponse = await getProducts();
  return {
    props: {
      productsResponse
    }
  };
}

export default Home
