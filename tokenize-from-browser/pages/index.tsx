import Head from 'next/head'

import styles from '../styles/Home.module.css'

import Cart from '../components/Cart'
import StoreItem from '../components/StoreItem'
import CheckoutButton from '../components/CheckoutButton'
import ClearCartButton from '../components/ClearCartButton'
import OrderTotal from '../components/OrderTotal'

import https from 'https'
import axios from 'axios'

export default function Home() {

  if (process.env.NODE_ENV === 'development') {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    })
    axios.defaults.httpsAgent = httpsAgent
    // eslint-disable-next-line no-console
    console.log(process.env.NODE_ENV, `RejectUnauthorized is disabled.`)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Exact Flower Shop</title>
        <meta name="description" content="Demo of ExactJS functionality" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles.grid}>
        <main className={styles.main}>
          <h2 className={styles.title}>
            Welcome to the <a href="https://developer.exactpay.com">Exact Payments</a> Plant Shop
          </h2>

          <p className={styles.description}>
            Get started by clicking on a Plant to add to your <code className={styles.code}>Cart</code>
          </p>

          <div className={styles.itemgrid}>
            <StoreItem itemnum={"01"} price={100} />
            <StoreItem itemnum={"02"} price={200} />
            <StoreItem itemnum={"03"} price={300} />
            <StoreItem itemnum={"04"} price={400} />
            <StoreItem itemnum={"05"} price={500} />
            <StoreItem itemnum={"06"} price={600} />
          </div>
        </main>

        <main className={styles.cart}>
          <h1 >Cart</h1>
          <OrderTotal />
          <div className={styles.cartgrid}>
            <Cart />
          </div>
          <div className={styles.checkout}>
            <CheckoutButton />
            <ClearCartButton />
          </div>
        </main>
      </div>

      <footer className={styles.footer}>
        Exact Payments &copy; 2023
      </footer>
    </div>
  )
}

