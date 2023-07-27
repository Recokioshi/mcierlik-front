import '../styles/globals.css';
import { appWithTranslation, useTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Container, MantineProvider } from '@mantine/core';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LINKS } from '../utils/constants/links';
import { wrapper } from '../store/store';
import { useLocalStorageStore } from '../store/useLocalStorageStore';

const navbarLinks = [
  { link: LINKS.HOME, label: 'home' },
  { link: LINKS.PRODUCTS, label: 'products' },
  { link: LINKS.ABOUT, label: 'about' },
  { link: LINKS.CONTACT, label: 'contact' },
];

const footerHeight = 60;

function MyApp({ Component, pageProps }: AppProps) {
  useLocalStorageStore('store');
  const { t } = useTranslation('navigation');
  const translatedLinks = navbarLinks.map(({ link, label }) => ({
    link,
    label: t(label),
  }));
  return (
    <>
      <Head>
        <title>MCierlik</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <Navbar links={translatedLinks} />
        <Container pb={footerHeight} pt="md">
          <Component {...pageProps} />
        </Container>
        <Footer footerHeight={footerHeight} />
      </MantineProvider>
    </>
  );
}

export default appWithTranslation(wrapper.withRedux(MyApp));
