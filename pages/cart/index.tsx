import { Container, Grid } from '@mantine/core';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { getProducts } from '../../utils/api/products';
import { CartList } from '../../components/Cart/CartList';
import { CartProduct, Product } from '../../utils/api/types/cms';
import {
  clearProducts,
  deleteProduct,
  setProduct,
} from '../../store/cartSlice';
import { CartSummary } from '../../components/Cart/CartSummary';

const Cart = ({ products }: { products: Product[]}) => {
  const dispatch = useDispatch();

  const handleSetProduct = useCallback((product: CartProduct) => {
    dispatch(setProduct(product));
  }, [dispatch]);

  const handleDeleteProduct = useCallback((product: CartProduct) => {
    dispatch(deleteProduct(product));
  }, [dispatch]);

  const handleClearProducts = useCallback(() => {
    dispatch(clearProducts(null));
  }, [dispatch]);

  return (
    <Container>
      <Grid>
        <Grid.Col md={8}>
          <CartList
            products={products}
            setProduct={handleSetProduct}
            deleteProduct={handleDeleteProduct}
            clearProducts={handleClearProducts}
          />
        </Grid.Col>
        <Grid.Col md={4}>
          <CartSummary products={products} />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const products = await getProducts(locale);
  return {
    props: {
      products,
      ...await serverSideTranslations(locale || '', ['common', 'navigation', 'cart']),
    },
  };
};

export default Cart;
