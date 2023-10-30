import { useRouter } from "next/router";
import Link from 'next/link'
import { useCartState } from '../util/useCartState'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Switch from 'react-switch'
import axios from 'axios'
import { totalPrice } from './OrderTotal'
import { Order } from "../types";

const CheckoutButton = () => {
  const router = useRouter();
  const store = useCartState()
  const isEmpty = store.items.length == 0
  const [altCheckoutSelected, setAltCheckoutSelected] = useState(false);

  const createOrUpdateOrder = (event: any) => {
    event.preventDefault();
    const order = store.order
    if (order == null) {
      createOrder(event.target.href);
    } else {
      updateOrder(order, event.target.href);
    }
  }

  const createOrder = (nextLocation: string) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + '/api/createOrder'

    const amount = totalPrice(store.items); //Price is in cents
    axios.post(url, {
      amount: amount
    }).then((response) => {
      console.debug("Order created")
      store.setOrder({
        token: response.data.token,
        orderId: response.data.orderId,
        totalAmount: amount
      })
      router.push(nextLocation)
    })
  }

  const updateOrder = (order: Order, nextLocation: string) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + '/api/updateOrder'

    const amount = totalPrice(store.items); //Price is in cents
    if (amount !== order.totalAmount) {
      axios.post(url, {
        orderId: store.order?.orderId,
        amount: amount
      }).then((response) => {
        console.debug("Order updated")
        order.totalAmount = response.data.amount
        store.setOrder(order)
        router.push(nextLocation)
      })
    } else {
      router.push(nextLocation)
    }
  }

  return (
    isEmpty ? <></> : <>
      <div className={styles.switch}>
        <Switch checked={altCheckoutSelected} onChange={setAltCheckoutSelected} onColor='#7ac833' offColor='#000000' activeBoxShadow='7ac833' uncheckedIcon={false} checkedIcon={false} />
        <p className={altCheckoutSelected ? styles.switchlabelgreen : ''}>Alternate Checkout UI</p>
      </div>
      <Link href={altCheckoutSelected ? 'checkout2' : 'checkout'} className={styles.card} onClick={createOrUpdateOrder}>Checkout</Link>
    </>
  )
}
export default CheckoutButton  
