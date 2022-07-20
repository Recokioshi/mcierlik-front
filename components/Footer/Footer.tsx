import React from 'react';
import { createStyles, Container, Group, ActionIcon, Footer as FooterWrapper } from '@mantine/core';
import { BrandTwitter, BrandYoutube, BrandInstagram } from 'tabler-icons-react';
import Image from 'next/image';
import logo from '../../assets/images/logo.png'

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
        <Group spacing={0} position="right" noWrap>
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