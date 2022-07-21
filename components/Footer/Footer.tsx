import React from 'react';
import { createStyles, Container, Group, ActionIcon, Footer as FooterWrapper } from '@mantine/core';
import { BrandYoutube, BrandFacebook } from 'tabler-icons-react';
import Image from 'next/image';
import logo from '../../assets/images/logo.png'

const hrefs = {
  youtube: 'https://www.youtube.com/channel/UCnybCIBv3RFW5SxFKb2rt6Q',
  facebook: 'https://www.facebook.com/people/Mariusz-Cierlik/100063744151193/',
}

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
          <ActionIcon<'a'> size="lg" component="a" href={hrefs.facebook}>
            <BrandFacebook size={18} href={hrefs.facebook}/>
          </ActionIcon>
          <ActionIcon<'a'> size="lg" component="a" href={hrefs.youtube}>
            <BrandYoutube size={18}/>
          </ActionIcon>
        </Group>
      </Container>
    </FooterWrapper>
  );
}