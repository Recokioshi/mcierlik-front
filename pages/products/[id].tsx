import React, { useCallback, useMemo, useState } from 'react';
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

export function Product({ product }: { product: Product | null}) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const productDescription = (product?.fullDescription || "").slice(0, MAX_DESCRIPTION_LENGTH);
  const [selectedPhoto, setSelectedPhoto] = useState(product?.photo);
  const gallery = useMemo(() => {
    const baseArray = [...(product?.gallery || [])];
    return product?.photo ? [product.photo, ...baseArray] : baseArray;
  }, [product?.photo, product?.gallery]);

  const onPhotoClick = useCallback((id: string) => {
    const photoFound = gallery.find((photo) => photo.id === id);
    if (photoFound) {
      setSelectedPhoto(photoFound);
    };
  }, [gallery]);

  const getOnPhotoClick = useCallback((id: string) => () => {
    onPhotoClick(id);
  }, [onPhotoClick]);

  const galleryPhotos = useMemo(() => {
    return (gallery).map((photo) => (
      <Grid.Col key={photo.hash} md={4} lg={3} xl={2} onClick={getOnPhotoClick(photo.id)}>
        <StrapiPhoto
          photo={photo}
          width={200}
          height={200}
        />
      </Grid.Col>
    ))
  }, [gallery, getOnPhotoClick]);

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
              {product?.features.map((feature) => (
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
          <Box sx={{ width: '100%'}}>
            {selectedPhoto && <StrapiPhoto 
              photo={selectedPhoto}
              width={480}
              height={480}
            />}
            <MediaQuery
              largerThan='md'
              styles={{ display: 'none', backgroundColor: 'red' }}
            >
              <Box>
                <GalleryCarousel gallery={gallery} onClick={onPhotoClick} />
              </Box>
            </MediaQuery>
          </Box>
        </div>
      </Container>
  );
}

export async function getStaticPaths() {
  const products = await getProducts();

  const paths = products.map((product) => ({
    params: { id: `${product.id}` },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  return {
    props: {
      product
    }
  };
}

export default Product