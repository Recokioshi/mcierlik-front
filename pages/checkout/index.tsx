import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CartState, selectCart, setAddress, setCustomer } from '../../store/cartSlice';
import { LINKS } from '../../utils/constants/links';
import { AddressForm } from '../../components/Checkout/AddressForm';

// eslint-disable-next-line @typescript-eslint/ban-types
type CheckoutProps = {};

const cartIsEmpty = (cart: CartState) => Object.keys(cart.products).length === 0;

const Checkout: React.FC<CheckoutProps> = () => {
  const cart = useSelector(selectCart);
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pageLoaded && cartIsEmpty(cart)) {
      router.push(LINKS.CART);
    }
    setPageLoaded(true);
  }, [cart, pageLoaded, router]);

  const handleSetAddress = useCallback(
    (address: CartState['address'] & CartState['customer']) => {
      dispatch(
        setAddress({
          city: address.city,
          street: address.street,
          zip: address.zip,
          country: address.country,
          state: address.state,
        }),
      );
      dispatch(
        setCustomer({
          email: address.email,
          firstName: address.firstName,
          lastName: address.lastName,
          phone: address.phone,
        }),
      );
    },
    [dispatch],
  );

  return (
    <div>
      <h1>Checkout</h1>
      <AddressForm onSubmit={handleSetAddress} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || '', ['navigation', 'addressForm'])),
  },
});

export default Checkout;
