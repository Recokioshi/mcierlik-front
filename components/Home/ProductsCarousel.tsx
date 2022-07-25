import { Container, Text, Space } from "@mantine/core";
import { useMemo } from "react";
import { Product } from "../../utils/api/types/cms";
import Carousel from "../Common/Carousel";

export const ProductsCarousel = ({ products }: { products: Product[]}) => {
  const cards = useMemo(() => 
    products.map(({ name, shortDescription, photo, id }) => ({
      title: name,
      description: shortDescription,
      link: `/products/${id}`,
      photo: photo,
    })), [products]);

  return (
    <Container>
      <Text size="xl" color="primary" align="center">
        {`CHECK OUT OUR LATEST PRODUCT${cards.length > 1 ? "S" : ""}`}
      </Text>
      <Space h="lg" />
      <Carousel
        cards={cards}
      />
    </Container>
  );
}
