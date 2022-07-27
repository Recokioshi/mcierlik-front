import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
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
import { getProducts } from '../../utils/api/products';
import Link from 'next/link';
import { Photo, Product } from '../../utils/api/types/cms';
import { StrapiPhoto } from '../../components/Common/StrapiPhoto';
import { GetStaticProps } from 'next';

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

const Products = ({ products }: { products: Product[]}) => {
  const { t: tc } = useTranslation('common');

  return (
    <Grid justify="center" align="center">
      {products.map(({ photo, name, shortDescription, id, price }) => (
        <Grid.Col key={id} md={4} lg={3} sm={6} xs={8}>
          <ArticleCard
            photo={photo}
            link={`/products/${id}`}
            title={name}
            description={`${shortDescription} - ${price}${tc('currencySuffix')}`}
            rating={"new"}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const products = await getProducts(locale);
  return {
    props: {
      products,
      ...await serverSideTranslations(locale || '', ['common', 'navigation']),
    }
  };
}

export default Products;