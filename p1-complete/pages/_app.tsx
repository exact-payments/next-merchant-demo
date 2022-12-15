import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'


export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Script src="https://api.exactpaysandbox.com/js/v1/exact.js" />


    <Component {...pageProps} />
  </>
}
