import React, { useState } from 'react';
import {
  createStyles,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  Popover,
} from '@mantine/core';
import { Check } from 'tabler-icons-react';
import { getProduct, getProducts } from '../../utils/api/products';
import { ProductAttributes } from '../../utils/api/types/cms';
import { ImageWithSkeleton } from '../../components/Common/ImageWithSkeleton';

const MAX_DESCRIPTION_LENGTH = 250;

const features = [
  'High quality materials',
  'Professional quality work',
  'Fast turnaround time',
  'Free shipping',
  'Free returns',
];

const useStyles = createStyles((theme) => ({
  inner: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column-reverse',
      gap: theme.spacing.xl * 2,
    },
  },

  content: {
    maxWidth: '50%',

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
}));

export function Product({ product }: { product: ProductAttributes | null}) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const productDescription = (product?.fullDescription || "").slice(0, MAX_DESCRIPTION_LENGTH);
  const photo = product?.photo?.data?.attributes;

  return (
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              {product?.name}
            </Title>
            <Text color="dimmed" mt="md">
              {product?.fullDescription.length || 0 > MAX_DESCRIPTION_LENGTH ? productDescription + '...' : productDescription}
            </Text>
            <Popover
              opened={opened}
              onClose={() => setOpened(false)}
              target={<Button onClick={() => setOpened((o) => !o)} variant="light">Show more</Button>}
              width={260}
              position="bottom"
              withArrow
            >
              <div style={{ display: 'flex' }}>
                {product?.fullDescription}
              </div>
            </Popover>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <Check size={12} />
                </ThemeIcon>
              }
            >
              {features.map((feature) => (
                <List.Item key={feature}>
                  <b>{feature}</b>
                </List.Item>
              ))}
            </List>

            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Buy now
              </Button>
              <Button variant="default" radius="xl" size="md" className={classes.control}>
                add to the basket
              </Button>
            </Group>
          </div>
          <ImageWithSkeleton
            url={photo?.url || ''}
            alt={photo?.caption || ''}
            width={480}
            height={480}
          />
        </div>
      </Container>
  );
}

export async function getStaticPaths() {
  const productsResponse = await getProducts();

  const paths = productsResponse?.data.map((product) => ({
    params: { id: `${product.id}` },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const productResponse = await getProduct(params.id)
  return {
    props: {
      product: productResponse?.data?.attributes || null,
    }
  };
}

export default Product