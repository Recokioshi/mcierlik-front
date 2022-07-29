import React, { useCallback, useMemo, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
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
  Box,
  MediaQuery,
  Grid,
} from '@mantine/core';
import { Check } from 'tabler-icons-react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getProduct, getProducts } from '../../utils/api/products';
import { Product } from '../../utils/api/types/cms';
import { StrapiPhoto } from '../../components/Common/StrapiPhoto';
import { GalleryCarousel } from '../../components/Common/Carousel/GalleryCarousel';

const MAX_DESCRIPTION_LENGTH = 250;

const useStyles = createStyles((theme) => ({
  inner: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.md,

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column-reverse',
      gap: theme.spacing.xl * 2,
    },
  },

  content: {
    maxWidth: '47%',

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

export function Product({ product }: { product: Product | null}) {
  const { classes } = useStyles();

  const { t } = useTranslation('products');
  const { t: tc } = useTranslation('common');

  const [opened, setOpened] = useState(false);
  const productDescription = (product?.fullDescription || '').slice(0, MAX_DESCRIPTION_LENGTH);
  const [selectedPhoto, setSelectedPhoto] = useState(product?.photo);
  const descriptionExpanded = product && product.fullDescription.length > MAX_DESCRIPTION_LENGTH;
  const gallery = useMemo(() => {
    const baseArray = [...(product?.gallery || [])];
    return product?.photo ? [product.photo, ...baseArray] : baseArray;
  }, [product?.photo, product?.gallery]);

  const onPhotoClick = useCallback((id: string) => {
    const photoFound = gallery.find((photo) => photo.id === id);
    if (photoFound) {
      setSelectedPhoto(photoFound);
    }
  }, [gallery]);

  const getOnPhotoClick = useCallback((id: string) => () => {
    onPhotoClick(id);
  }, [onPhotoClick]);

  const galleryPhotos = useMemo(() => (gallery).map((photo) => (
      <Grid.Col key={photo.hash} md={4} lg={3} xl={2} onClick={getOnPhotoClick(photo.id)} style={{ cursor: 'pointer' }}>
        <StrapiPhoto
          photo={photo}
          width={200}
          height={200}
        />
      </Grid.Col>
  )), [gallery, getOnPhotoClick]);

  return (
      <Container>
        <MediaQuery
          smallerThan="md"
          styles={{ display: 'none' }}
        >
          <Grid>
            {galleryPhotos}
          </Grid>
        </MediaQuery>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              {product?.name}
            </Title>
            <Text size='xl' weight={700} mt={30}>{product?.price} {tc('currencySuffix')}</Text>
            <Text color="dimmed" mt="md">
              {descriptionExpanded ? `${productDescription}...` : productDescription}
            </Text>
            {descriptionExpanded && <Popover
              opened={opened}
              onClose={() => setOpened(false)}
              target={<Button onClick={() => setOpened((o) => !o)} variant="light">{t('showMore')}</Button>}
              width="70%"
              position="bottom"
              withArrow
            >
              <div style={{ display: 'flex' }}>
                {product?.fullDescription}
              </div>
            </Popover>}

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
              {product?.features.map((feature) => (
                <List.Item key={feature}>
                  <b>{feature}</b>
                </List.Item>
              ))}
            </List>

            <Group mt={30}>
              {/* <Button radius="xl" size="md" className={classes.control}>
                {t('buyNow')}
              </Button>
              <Button variant="default" radius="xl" size="md" className={classes.control}>
                {t('addToCart')}
              </Button> */}
              <Link href={`/contact?product=${product?.name}`} passHref>
                <Button radius="xl" size="md" className={classes.control}>
                  {t('askButton')}
                </Button>
              </Link>
            </Group>
          </div>
          <Box sx={{ width: '100%' }}>
            {selectedPhoto && <StrapiPhoto
              photo={selectedPhoto}
              width={480}
              height={480}
            />}
            {gallery.length > 1 && <MediaQuery
              largerThan='md'
              styles={{ display: 'none', backgroundColor: 'red' }}
            >
              <Box>
                <GalleryCarousel gallery={gallery} onClick={onPhotoClick} />
              </Box>
            </MediaQuery>}
          </Box>
        </div>
      </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: Array<string | { params: { id: string}; locale?: string }> = [];
  const productsPromises = [];
  if (!locales) {
    return { paths, fallback: true };
  }
  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i];
    productsPromises.push(getProducts(locale));
  }
  const products = await Promise.all(productsPromises);
  for (let i = 0; i < products.length; i++) {
    const locale = locales[i];
    const localeProducts = products[i];
    for (let j = 0; j < localeProducts.length; j++) {
      const product = localeProducts[j];
      paths.push({
        params: {
          id: `${product.id}`,
        },
        locale,
      });
    }
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const product = await getProduct(`${params?.id}`, locale);
  return {
    props: {
      product,
      ...await serverSideTranslations(locale || '', ['common', 'products', 'navigation']),
    },
  };
};

export default Product;
