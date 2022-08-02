import { CartProduct } from "../api/types/cms";
import { useLocalStorage } from "./common";

export const getProductKey = (product: CartProduct) => `${product.id}-${product.color}`;

export const useCart = () => {
  const [cart, setCart, clearCart] = useLocalStorage("cart", {
    products: {},
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    },
    shipping: {
      method: '',
      price: 0,
    },
  });

  const setProduct = (product: CartProduct) => {
    const { id, color, quantity } = product;
    const { products } = cart;
    const newProducts = { ...products };
    const key = getProductKey(product);
    if(product.quantity === 0) {
      delete newProducts[key];
    } else if (newProducts[key]) {
      newProducts[key].quantity = product.quantity;
    } else {
      newProducts[key] = {
        id,
        quantity,
        color,
      };
    }
    setCart({ ...cart, products: newProducts });
  }

  const removeProduct = (product: CartProduct) => {
    const { id } = product;
    const { products } = cart;
    const newProducts = { ...products };
    if(newProducts[id]) {
      delete newProducts[id];
    }
    setCart({ ...cart, products: newProducts });
  }

  return { cart, setProduct, removeProduct, clearCart };
}