import { Divider, Space } from '@mantine/core';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticPropsContext, NextPage } from 'next';
import { FeaturesSection } from '../components/Home/FeaturesSection';
import { HeroSection } from '../components/Home/HeroSection';
import { ProductsCarousel } from '../components/Home/ProductsCarousel';
import { getProducts } from '../utils/api/products';
import { Product } from '../utils/api/types/cms';

type HomeProps = { products: Product[]};

const Home: NextPage<HomeProps> = ({ products }) => (
    <>
      <HeroSection />
      <Space h="md" />
      <ProductsCarousel products={products}/>
      <Divider my="sm" />
      <FeaturesSection />
    </>
);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const products = await getProducts(locale);
  return {
    props: {
      products,
      ...await serverSideTranslations(locale || '', ['common', 'home', 'navigation']),
    },
  };
}

export default Home;
