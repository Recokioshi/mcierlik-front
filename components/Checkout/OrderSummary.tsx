import React, { useMemo } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Container, createStyles, Divider, SimpleGrid, Space, Stack, Text, TextInput, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { selectProducts, selectShipping } from '../../store/cartSlice';
import { AddressForm } from './AddressForm';
import { getProductsFromCartWithData } from '../Cart/utils';
import { Product } from '../../utils/api/types/cms';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },

  cityAndZip: {
    display: 'flex',
    gap: theme.spacing.md,
  },

  spaceFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input: {
    height: '3rem',
    paddingTop: '1rem',
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },

  button: {
    marginLeft: 'auto',
  },

  column: {
    width: '100%',
  },
}));

const summaryFormSchema = z.object({
  method: z.string(),
  price: z.number(),
});

type OrderSummaryProps = { products: Product[] };

export const OrderSummary: React.FC<OrderSummaryProps> = ({ products }) => {
  const { classes } = useStyles();
  const { t } = useTranslation('orderSummary');
  const { t: tCommon } = useTranslation('common');

  const cartProducts = useSelector(selectProducts);

  const productsFromCart = useMemo(() => getProductsFromCartWithData(cartProducts, products), [cartProducts, products]);

  const shipping = useSelector(selectShipping);

  const { register } = useForm({
    resolver: zodResolver(summaryFormSchema),
    values: { ...shipping },
  });

  return (
    <Container>
      <SimpleGrid cols={2}>
        <Container className={classes.column}>
          {productsFromCart.map((product) => (
            <Stack key={product.id} spacing="xs">
              <Box key={product.id} className={classes.spaceFlex}>
                <Link href={`/products/${product.id}`}>
                  <Title order={3}>{`${product.product.name}`}</Title>
                </Link>
                <Text>{`x${product.quantity}`}</Text>
              </Box>
              <Title order={4}>{`${product.quantity * product.product.price}${tCommon('currencySuffix')}`}</Title>
              <Divider />
            </Stack>
          ))}
        </Container>
        <Container className={classes.column}>
          <AddressForm readonly />
          <Divider />
          <Space h="sm" />
          <form className={classes.form}>
            <Box className={classes.spaceFlex}>
              <Title order={3}>{`${t('shipping')}`}</Title>
            </Box>

            <TextInput {...register('method')} classNames={classes} disabled />
            <TextInput {...register('price')} classNames={classes} disabled />
          </form>
        </Container>
      </SimpleGrid>
    </Container>
  );
};
