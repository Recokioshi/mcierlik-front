import React from 'react';
import { createStyles, Container, Group, ActionIcon, Footer as FooterWrapper } from '@mantine/core';
import { BrandTwitter, BrandYoutube, BrandInstagram } from 'tabler-icons-react';
import Image from 'next/image';
import logo from '../../assets/images/logo.png'

const FOOTER_HEIGHT = 80;

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();

  return (
    <FooterWrapper height={FOOTER_HEIGHT} p="md">
        <Container className={classes.inner}>
          <Image
            className="h-8 w-auto sm:h-10"
            src={logo}
            alt="logo"
            width={48}
            height={48}
          />
          <Group spacing={0} className={classes.links} position="right" noWrap>
            <ActionIcon size="lg">
              <BrandTwitter size={18} />
            </ActionIcon>
            <ActionIcon size="lg">
              <BrandYoutube size={18} />
            </ActionIcon>
            <ActionIcon size="lg">
              <BrandInstagram size={18} />
            </ActionIcon>
          </Group>
        </Container>
    </FooterWrapper>
  );
}