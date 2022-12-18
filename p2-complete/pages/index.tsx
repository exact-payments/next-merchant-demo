import Head from 'next/head'

import styles from '../styles/Home.module.css'

import Cart from '../components/Cart'
import  StoreItem  from '../components/StoreItem'
import CheckoutButton from '../components/CheckoutButton'
import ClearCartButton from '../components/ClearCartButton'
import OrderTotal from '../components/OrderTotal'

import Switch from "react-switch";
import { useState } from 'react'


export default function Home() {

  let [altCheckoutSelected, setAltCheckoutSelected] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>Exact Plant Shop</title>
        <meta name="description" content="Demo of ExactJS functionality" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <div className={styles.grid}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://developer.exactpay.com">Exact Payments</a> Plant Shop
        </h1>

        <p className={styles.description}>
          Get started by clicking on a Plant to add to your <code className={styles.code}>Cart</code>
          <br/>
          <br/>
          We are having a sale today- all plants are $10.00 USD!
        </p>


        <div className={styles.itemgrid}>
          <StoreItem itemnum={"01"}/>
          <StoreItem itemnum={"02"}/>
          <StoreItem itemnum={"03"}/>
          <StoreItem itemnum={"04"}/>
          <StoreItem itemnum={"05"}/>
          <StoreItem itemnum={"06"}/>
        </div>
      </main>
      <main className={styles.cart}>
        <h1 >Cart</h1> 
        <OrderTotal/>
        <div className={styles.cartgrid}>
          <Cart/>
        </div>
        <div className={styles.switch}>
          <Switch checked={altCheckoutSelected} onChange={setAltCheckoutSelected} onColor='7ac833' offColor= '000000' activeBoxShadow='7ac833' uncheckedIcon={false} checkedIcon={false}/>
          <p className={altCheckoutSelected ? styles.switchlabelgreen :'' }>Alternate Checkout UI</p>
        </div>
        <div className={styles.checkout}>
          <CheckoutButton link= {altCheckoutSelected ? 'checkout2' : 'checkout'} />
          <ClearCartButton/>
        </div>
        


      </main>

      </div>
      

      <footer className={styles.footer}>
          Exact Payments 2022
      </footer>
    </div>
    
    
  )
}

