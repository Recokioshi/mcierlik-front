import { Button, Container, Divider, Grid, SimpleGrid, Text, Title } from '@mantine/core';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/cartSlice';
import { Product } from '../../utils/api/types/cms';

type CartListProps = {
  products: Product[];
};

export const CartSummary: React.FC<CartListProps> = ({ products }) => {
  const { t } = useTranslation('cart');
  const { t: tCommon } = useTranslation('common');

  const cart = useSelector(selectCart);

  const summaryPrice = useMemo(
    () =>
      Object.keys(cart.products).reduce((acc, cartProductKey) => {
        const cartProduct = cart.products[cartProductKey];
        const product = products.find((nextProduct) => nextProduct.id === cartProduct.id);
        return acc + (product?.price || 0) * cartProduct.quantity;
      }, 0),
    [cart.products, products],
  );

  const shippingPrice = useMemo(() => cart.shipping.price, [cart.shipping]);

  return (
    <Container>
      <SimpleGrid cols={1}>
        <Title order={3} style={{ height: '2em' }}>
          {t('sum.header')}
        </Title>
        <Divider />
        <Grid.Col>
          <Grid>
            <Grid.Col span={6}>
              <Text size={'md'}>{t('sum.total')}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size={'md'}>{`${summaryPrice} ${tCommon('currencySuffix')}`}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              <Text size={'md'}>{t('sum.shipping')}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size={'md'}>{`${shippingPrice} ${tCommon('currencySuffix')}`}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              <Title order={4}>{t('sum.grandTotal')}</Title>
            </Grid.Col>
            <Grid.Col span={6}>
              <Title order={4}>{`${summaryPrice + shippingPrice} ${tCommon('currencySuffix')}`}</Title>
            </Grid.Col>
          </Grid>
        </Grid.Col>

        {Object.keys(cart.products).length > 0 && (
          <Link href="/checkout" passHref>
            <Button>{t('sum.toCheckout')}</Button>
          </Link>
        )}
      </SimpleGrid>
    </Container>
  );
};
