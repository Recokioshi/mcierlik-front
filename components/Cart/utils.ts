import { CartProduct, Product } from '../../utils/api/types/cms';

export const getProductsFromCartWithData = (
  cartProducts: Record<string, CartProduct>,
  productsData: Product[],
): (CartProduct & { product: Product })[] =>
  Object.keys(cartProducts)
    .map((productKey) => ({
      ...cartProducts[productKey],
      product: productsData?.find((product) => product.id === cartProducts[productKey].id),
    }))
    .filter((product) => product.product !== undefined) as (CartProduct & { product: Product })[];
