import { Container, Text, Space } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import { Product } from "../../utils/api/types/cms";
import Carousel from "../Common/Carousel";

export const ProductsCarousel = ({ products }: { products: Product[]}) => {
  const { t } = useTranslation('home');
  const cards = useMemo(() => 
    products.map(({ name, shortDescription, photo, id }) => ({
      title: name,
      description: shortDescription,
      link: `/products/${id}`,
      photo: photo,
      id,
    })), [products]);

  return (
    <Container>
      <Text size="xl" color="primary" align="center">
        {`${t('carousel.header').toUpperCase()}`}
      </Text>
      <Space h="lg" />
      <Carousel
        cards={cards}
        height="300px"
      />
    </Container>
  );
}
