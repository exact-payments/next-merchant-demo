import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  const exactJsSource = `https://${process.env.NEXT_PUBLIC_P2_DOMAIN}/js/v1/exact.js`

  return <>
    <Script src={exactJsSource} />
    <Component {...pageProps} />
  </>
}
