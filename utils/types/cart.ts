import { CartProduct, Product } from "../api/types/cms";

export type Cart = {
  products: Record<string, CartProduct>;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  shipping: {
    method: string;
    price: number;
  };
}
