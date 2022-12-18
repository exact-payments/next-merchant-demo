import { useCartState } from '../util/useCartState'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { FC } from 'react'

const CheckoutButton : FC<{}> = () => {
    const store = useCartState()
    const isEmpty = store.items.length == 0
    return (
      isEmpty ? <></> : <Link href= "checkout" className={styles.card}>Checkout</Link>
    )
  }
export default CheckoutButton  