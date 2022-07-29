import React from 'react';
import { createStyles, Container, Footer as FooterWrapper } from '@mantine/core';
import Image from 'next/image';
import logo from '../../assets/images/logo-inverted.png';
import { SocialMediaLinks } from '../SocialMediaLinks';

const useStyles = createStyles(() => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export function Footer({ footerHeight }: { footerHeight: number }) {
  const { classes } = useStyles();

  return (
    <FooterWrapper height={footerHeight} p="md" fixed>
      <Container className={classes.inner}>
        <Image
          className="h-8 w-auto sm:h-10"
          src={logo}
          alt="logo"
          width={32}
          height={32}
        />
        <SocialMediaLinks />
      </Container>
    </FooterWrapper>
  );
}
