import {
  Box,
  Button,
  Card,
  Container,
  createStyles,
  Divider,
  Grid,
  NumberInput,
  SimpleGrid,
  Text, Title,
} from '@mantine/core';
import Link from 'next/link';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { X, ShoppingCartOff } from 'tabler-icons-react';
import { selectCart } from '../../store/cartSlice';
import { StrapiPhoto } from '../Common/StrapiPhoto';
import { CartProduct, Product } from '../../utils/api/types/cms';

const useStyles = createStyles((theme) => ({
  spaceFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageBox: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[0],
    borderRadius: theme.radius.md,
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    height: '100%',
  },
  rightColumnContainer: {
    alignItems: 'flex-end',
  },
  card: {
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  action: {
    display: 'flex',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },
  emptyCart: {
    textAlign: 'center',
    padding: theme.spacing.md,
  },
  button: {
    padding: 0,
    aspectRatio: '1 / 1',
  },
}));

type CartListProps = {
  products: Product[];
  setProduct: (product: CartProduct) => void;
  deleteProduct: (product: CartProduct) => void;
  clearProducts: () => void;
};

export const CartList: React.FC<CartListProps> = ({
  products,
  setProduct,
  deleteProduct,
  clearProducts,
}) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation('cart');
  const { t: tCommon } = useTranslation('common');

  const cart = useSelector(selectCart);

  const productsFromCart = useMemo(
    () =>
      Object.keys(cart.products).map((productKey) => ({
        ...cart.products[productKey],
        product: products.find((product) => product.id === cart.products[productKey].id),
      })).filter(
        (product) => product.product !== undefined,
      ) as (CartProduct & { product: Product })[],
    [cart.products, products],
  );
  const itemsCount = useMemo(() => Object.keys(cart.products).reduce((sum, productKey) => {
    const product = cart.products[productKey];
    return sum + product.quantity;
  }, 0), [cart]);

  const addQuantity = useCallback(
    (product: CartProduct) => () => setProduct({ ...product, quantity: product.quantity + 1 }),
    [setProduct],
  );

  const subtractQuantity = useCallback(
    (product: CartProduct) => () => setProduct({ ...product, quantity: product.quantity - 1 }),
    [setProduct],
  );

  const setQuantity = useCallback(
    (product: CartProduct) =>
      (value: number | undefined) =>
        setProduct({ ...product, quantity: value || product.quantity }),
    [setProduct],
  );

  const deleteProductFromCart = useCallback(
    (product: CartProduct) => () => deleteProduct(product),
    [deleteProduct],
  );

  return (
    <Container>
      <SimpleGrid cols={1}>
        <Box className={classes.spaceFlex}>
          <Title order={3}>{`${t('list.header')} (${itemsCount})`}</Title>
          <Button
            style={{ float: 'right' }}
            onClick={clearProducts}
            color="danger"
            size="sm"
            variant="subtle"
            disabled={itemsCount === 0}
            title={t('list.clearCart')}
          >
            <ShoppingCartOff />
          </Button>
        </Box>
        <Divider />
        {productsFromCart.map(({ product, ...cartProduct }) => (
          <Grid.Col key={product.id}>
            <Grid>
              <Grid.Col span={3}>
                <Box className={classes.imageBox}>
                  <StrapiPhoto photo={product.photo} width={200} height={200} />
                </Box>
              </Grid.Col>
              <Grid.Col span={7}>
                <Box className={classes.columnContainer}>
                  <Box>
                    <Link href={`/products/${product.id}`}>
                      <a>
                        <Title order={4}>{product.name}</Title>
                      </a>
                    </Link>
                    <Text>{product.shortDescription}</Text>
                  </Box>
                  <Card.Section>
                    <Box className={classes.action}>
                      <Button
                        onClick={subtractQuantity(cartProduct)}
                        variant="subtle"
                        className={classes.button}
                      >
                        -
                      </Button>
                      <NumberInput
                        min={1}
                        max={99}
                        hideControls
                        value={cartProduct.quantity}
                        onChange={setQuantity(cartProduct)}
                        styles={{
                          input: {
                            width: '3rem',
                          },
                        }}
                      />
                      <Button
                        onClick={addQuantity(cartProduct)}
                        variant="subtle"
                        className={classes.button}
                      >
                        +
                      </Button>
                    </Box>
                  </Card.Section>
                </Box>
              </Grid.Col>
              <Grid.Col span={2}>
                <Box className={cx(classes.columnContainer, classes.rightColumnContainer)}>
                  <Button
                    onClick={deleteProductFromCart(cartProduct)}
                    variant="subtle"
                    className={classes.button}
                  >
                    <X />
                  </Button>
                  <Title order={5}>
                    {`${product.price * cartProduct.quantity} ${tCommon('currencySuffix')}`}
                  </Title>
                </Box>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        ))}
        {itemsCount <= 0 && (
          <Card className={classes.emptyCart}>
            <Text size="md">{t('list.empty')}</Text>
          </Card>
        )}
      </SimpleGrid>
    </Container>
  );
};
