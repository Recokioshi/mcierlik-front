import { Divider, Space } from '@mantine/core';
import type { NextPage } from 'next';
import { FeaturesSection } from '../components/Home/FeaturesSection';
import { HeroSection } from '../components/Home/HeroSection';
import { ProductsCarousel } from '../components/Home/ProductsCarousel';
import { getProducts, } from '../utils/api/products';
import { Product } from '../utils/api/types/cms';

type HomeProps = { products: Product[]};

const Home: NextPage<HomeProps> = ({ products }) => {
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
  const products = await getProducts();
  return {
    props: {
      products
    }
  };
}

export default Home
