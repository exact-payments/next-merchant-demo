import { FormEvent, useEffect, useCallback } from "react"
import { useRouter } from "next/router"

import { useCartState } from "../util/useCartState"
import { OrderTotal } from "../components/OrderTotal"
import Disclaimer from "../components/Disclaimer"

import styles from '../styles/Home.module.css'

import { Exact, ExactJSPaymentPayload, ExactPaymentForm } from '../types'

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
        },
      }
    });

    components.addComponent('addressDiv', 'address', {
      billingAddress: {
        type: 'minimal',
      },
      label: { position: "above" },
      style: {
        default: {
          padding: '2px',
          border: "1px solid #ccc",
          fontSize: "14px",
        },
      }
    });

    exact.on("payment-complete", (payload: unknown) => {
      const paymentPayload = payload as ExactJSPaymentPayload
      console.debug(`MERCHANT payment complete: ${JSON.stringify(payload)}`);
      (document.getElementById('payment_id')! as HTMLInputElement).value = paymentPayload.paymentId;
      (document.getElementById('myForm') as HTMLFormElement).submit();
    })

    exact.on("payment-failed", (payload) => {
      console.debug(`MERCHANT payment failed: ${JSON.stringify(payload)}`);
    })
  }

  const handleSubmit = useCallback((event: FormEvent<ExactPaymentForm>) => {
    event.preventDefault()
    exact?.payOrder()
  }, [exact])

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
      <Disclaimer />
      <main className={styles.main}>
        <OrderTotal />
        <div id="paymentForm" className={styles.paymentForm}>
          <form id="myForm" action="api/receivePaymentId" method="post" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" autoComplete="email" />
            </div>

            <div id="cardElement" className={styles.paymentElement}>
            </div>

            <div id="addressDiv" className={styles.paymentElement}>
            </div>

            <input type="hidden" name="payment_id" id="payment_id"></input>

            <div>
              <input type="submit" name="commit" value="Pay Now" data-disable-with="Pay Now" />
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

