import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Navbar } from '../components/Navbar/Navbar'
import { MantineProvider } from '@mantine/core';

const navbarLinks = [
  { link: '/', label: 'Home' },
  { link: '/products', label: 'Products' },
  { link: '/about', label: 'About' },
  { link: '/contact', label: 'Contact' },
]

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Page title</title>
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
        <Navbar links={navbarLinks}/>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  )
}

export default MyApp
