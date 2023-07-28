import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { CartState, selectCart } from '../../store/cartSlice';
import { LINKS } from '../../utils/constants/links';
import { OrderSummary } from '../../components/Checkout/OrderSummary';
import { getProducts } from '../../utils/api/products';
import { Product } from '../../utils/api/types/cms';

// eslint-disable-next-line @typescript-eslint/ban-types
type CheckoutProps = { products: Product[] };

const cartIsEmpty = (cart: CartState) => Object.keys(cart.products).length === 0;

const Summary: React.FC<CheckoutProps> = ({ products }) => {
  const cart = useSelector(selectCart);
  const { t } = useTranslation('orderSummary');
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    if (pageLoaded && cartIsEmpty(cart)) {
      router.push(LINKS.CART);
    }
    setPageLoaded(true);
  }, [cart, pageLoaded, router]);

  return (
    <div>
      <h1>{t('header')}</h1>
      <OrderSummary products={products} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const products = await getProducts(locale);
  return {
    props: {
      products,
      ...(await serverSideTranslations(locale || '', ['navigation', 'orderSummary', 'addressForm', 'common'])),
    },
  };
};

export default Summary;
