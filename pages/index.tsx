import { Space } from '@mantine/core';
import type { NextPage } from 'next';
import { FeaturesSection } from '../components/Home/FeaturesSection';
import { HeroSection } from '../components/Home/HeroSection';

const Home: NextPage = () => {
  return (
    <>
      <HeroSection />
      <Space h="md" />
      <FeaturesSection />
    </>
  )
}

export default Home
