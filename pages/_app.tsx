import '../styles/globals.css'
import './products/products.css'
import type { AppProps } from 'next/app'
import { Navbar } from '../components/Navbar/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
