import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next';
import { useTranslation } from 'next-i18next';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Navbar} from '../components/Navbar/Navbar'
import { Footer } from '../components/Footer/Footer'
import { Container, MantineProvider } from '@mantine/core';

const navbarLinks = [
  { link: '/', label: 'home' },
  { link: '/products', label: 'products' },
  { link: '/about', label: 'about' },
  { link: '/contact', label: 'contact' },
]

const footerHeight = 60;

function MyApp({ Component, pageProps }: AppProps) {
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
        <Navbar links={translatedLinks}/>
        <Container pb={footerHeight} pt="md">
          <Component {...pageProps}/>
        </Container>
        <Footer footerHeight={footerHeight}/>
      </MantineProvider>
    </>
  )
}

export default appWithTranslation(MyApp);
