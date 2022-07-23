import { BData, ProductAttributes } from "../../utils/api/types/cms";
import Carousel from "../Common/Carousel";

export const ProductsCarousel = ({ products }: { products: BData<ProductAttributes>[]}) => {
  return (
    <Carousel
      cards={products.map(({ attributes: product, id }) => ({
        title: product.name,
        description: product.shortDescription,
        link: `/products/${id}`,
        photo: product.photo.data.attributes,
      }))}
    />
  );
}
