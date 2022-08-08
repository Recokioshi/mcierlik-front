import Link from 'next/link';
import {
  ActionIcon, Box, createStyles, Badge,
} from '@mantine/core';
import { ShoppingCart } from 'tabler-icons-react';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../store/cartSlice';

const useStyles = createStyles((theme) => ({
  actionIcon: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: '-0.5rem',
    right: '-0.5rem',
    backgroundColor: theme.primaryColor[9],
    color: theme.colors.dark[5],
    fontSize: theme.fontSizes.sm,
    padding: '0.25rem 0.25rem',
    borderRadius: '1rem',
    zIndex: 1,
  },
  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

type CartProps = {
  active?: boolean;
};

export const Cart: React.FC<CartProps> = ({ active }) => {
  const { classes, cx } = useStyles();
  const products = useSelector(selectProducts);

  const itemsCount = useMemo(() => Object.keys(products).reduce((sum, productId) => {
    const product = products[productId];
    return sum + product.quantity;
  }, 0), [products]);

  const BadgeIcon = useMemo(() => () => (
    <>
      {(itemsCount && <Badge className={classes.badge}>{itemsCount}</Badge>) || null}
    </>
  ), [classes.badge, itemsCount]);

  return (
  <Link href="/cart" passHref>
    <ActionIcon<'a'> size="lg" component="a" className={cx(classes.actionIcon, { [classes.linkActive]: active })}>
      <BadgeIcon />
      <Box component={ShoppingCart} size={18} />
    </ActionIcon>
  </Link>
  );
};
