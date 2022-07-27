import React from 'react';
import { useTranslation } from 'next-i18next';
import { createStyles, Container, Title, Text, Button } from '@mantine/core';
import Link from 'next/link';


<a href="https://icons8.com/photos">Photo from Icons8 Moose</a>


const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: '#11284b',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage:
      'linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://photo-cdn2.icons8.com/X-AI3oud-XdINTcBvjtBHAK6I5lFePzSFm4OHHvN7n8/rs:fit:1612:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi81Y2Q2YjVlNzdl/YWY0YzA5OWI3NzJk/ZWY4NzU5MDRjYS5q/cGc.jpg)',
    paddingTop: theme.spacing.xl * 3,
    paddingBottom: theme.spacing.xl * 3,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  image: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  content: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: 500,
    fontSize: 48,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: 34,
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: 500,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
    },
  },

  control: {
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 22,

    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },

  imageCreds: {
    position: 'relative',
    bottom: -theme.spacing.xl * 2,
    paddingRight: theme.spacing.xl * 2,
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  }
}));

export function HeroSection() {
  const { t } = useTranslation('home');
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              {t('hero.header-prefix')}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                {t('hero.header-bolded')}
              </Text>
              {t('hero.header-suffix')}
            </Title>

            <Text className={classes.description} mt={30}>
            {t('hero.subTitle')}
            </Text>
            <Link href="/products">
              <Button
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
                size="xl"
                className={classes.control}
                mt={40}
              >
                {t('hero.showAllButton')}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
      <div className={classes.imageCreds}>
        <a href="https://icons8.com/photos">Photo from Icons8 Moose</a>
      </div>
    </div>
  );
}