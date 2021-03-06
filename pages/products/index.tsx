import React from 'react';
import Image from 'next/image';
import { Bookmark, Heart, Share } from 'tabler-icons-react';
import {
  Card,
  Text,
  ActionIcon,
  Badge,
  Group,
  useMantineTheme,
  createStyles,
  Grid,
} from '@mantine/core';
import { ProductResponse, getProducts } from '../../utils/api/products';
import Link from 'next/link';
import { Photo } from '../../utils/api/types/cms';
import { StrapiPhoto } from '../../components/Common/StrapiPhoto';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    '&:hover': {
      cursor: 'pointer',
    },
  },

  rating: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: 'none',
  },

  title: {
    display: 'block',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

interface ArticleCardProps {
  photo: Photo
  link: string;
  title: string;
  description: string;
  rating: string;
}

export function ArticleCard({
  className,
  photo,
  link,
  title,
  description,
  rating,
  ...others
}: ArticleCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof ArticleCardProps>) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  return (
    <Card withBorder radius="md" className={cx(classes.card, className)} {...others}>
      <Card.Section>
        <Link href={link} passHref>
          <a>
            <StrapiPhoto photo={photo} height={512} width={512} />
          </a>
        </Link>
      </Card.Section>

      <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
        {rating}
      </Badge>

      <Text className={classes.title} weight={500}>
        {title}
      </Text>

      <Text size="sm" color="dimmed" lineClamp={4}>
        {description}
      </Text>

      <Group position="apart" className={classes.footer}>
        <Group spacing={8} mr={0}>
          <ActionIcon className={classes.action} style={{ color: theme.colors.red[6] }}>
            <Heart size={16} />
          </ActionIcon>
          <ActionIcon className={classes.action} style={{ color: theme.colors.yellow[7] }}>
            <Bookmark size={16} />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <Share size={16} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}

const Products = ({ productsResponse }: { productsResponse: ProductResponse | null}) => {
  const products = productsResponse?.data || [];
  return (
    <Grid justify="center" align="center">
      {products.map(({ attributes: product, id }) => (
        <Grid.Col key={id} md={4} lg={3} sm={6} xs={8}>
          <ArticleCard
            photo={product.photo.data.attributes}
            link={`/products/${id}`}
            title={product.name}
            description={product.shortDescription}
            rating={"new"}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export async function getStaticProps() {
  const productsResponse = await getProducts();
  return {
    props: {
      productsResponse
    }
  };
}

export default Products;