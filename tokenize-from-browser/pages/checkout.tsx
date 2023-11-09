import { FormEvent, useEffect } from "react"
import { useRouter } from "next/router"

import { useCartState } from "../util/useCartState"
import { OrderTotal } from "../components/OrderTotal"
import Disclaimer from "../components/Disclaimer"

import styles from '../styles/Home.module.css'

import { Exact, ExactJSTokenPayload, ExactPaymentForm } from '../types'

export default function Checkout() {
  let exact: Exact | null = null

  const router = useRouter()
  const store = useCartState()

  const configureExactJS = () => {
    exact = ExactJS(store.order?.token as string)
    const components = exact.components({ orderId: store.order?.orderId as string })

    components.addCard('cardElement', {
      label: { position: "above" },
      style: {
        default: {
          padding: '2px',
          border: "1px solid #ccc",
          fontSize: "14px",
          backgroundColor: "#b6bdcb"
        },
      }
    });

    components.addComponent('addressElement', 'address', {
      billingAddress: {
        type: "full",
      },
      label: { position: "above" },
      style: {
        default: {
          padding: '2px',
          border: "1px solid #ccc",
          fontSize: "14px",
          backgroundColor: "#b6bdcb"
        },
      }
    });

    exact.on("payment-complete", (payload: unknown) => {
      const tokenPayload = payload as ExactJSTokenPayload
      console.debug(`MERCHANT payment-complete: ${JSON.stringify(payload)}`);
      (document.getElementById('token')! as HTMLInputElement).value = tokenPayload.token;
      (document.getElementById('card_brand')! as HTMLInputElement).value = tokenPayload.card_brand;
      (document.getElementById('expiry_month')! as HTMLInputElement).value = tokenPayload.expiry_month;
      (document.getElementById('expiry_year')! as HTMLInputElement).value = tokenPayload.expiry_year;
      (document.getElementById('last4')! as HTMLInputElement).value = tokenPayload.last4;
      (document.getElementById('order_id')! as HTMLInputElement).value = store.order?.orderId as string;
      (document.getElementById('myForm') as HTMLFormElement).submit();
    });

    exact.on("payment-failed", (payload) => {
      console.debug(`MERCHANT payment failed: ${JSON.stringify(payload)}`);
    });
  }

  const handleSubmit = (event: FormEvent<ExactPaymentForm>) => {
    event.preventDefault()
    exact?.tokenize()
  }

  const cleanupExactJS = () => {
    exact?.reset();
    exact = null
  }

  useEffect(() => {
    if (store.order === null) {
      // order not created => send home
      router.push('/')
    } else {
      configureExactJS()
      return () => {
        cleanupExactJS();
      }
    }
  }, [])

  return (
    <>
      <div className={styles.checkoutdisclaimer}>
        <h1>1-Pass Tokenized Payment</h1>
      </div >

      <Disclaimer />
      <main className={styles.main}>
        <OrderTotal />
        <div id="paymentForm" className={styles.paymentForm}>
          <form id="myForm" action="api/receiveTokenAndPay" method="post" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" autoComplete="email" />
            </div>

            <div id="cardElement" ></div>
            <div id="addressElement" ></div>

            <input type="hidden" name="token" id="token"></input>
            <input type="hidden" name="card_brand" id="card_brand"></input>
            <input type="hidden" name="expiry_month" id="expiry_month"></input>
            <input type="hidden" name="expiry_year" id="expiry_year"></input>
            <input type="hidden" name="last4" id="last4"></input>
            <input type="hidden" name="order_id" id="order_id"></input>

            <div>
              <input type="submit" name="commit" value="Pay Now" data-disable-with="Pay Now" />
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

