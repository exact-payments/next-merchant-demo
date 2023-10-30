import { FormEvent, useEffect, useCallback, useState } from "react"

import { useRouter } from "next/router"

import { useCartState } from "../util/useCartState"
import { OrderTotal } from "../components/OrderTotal"

import styles from '../styles/Home.module.css'

import { Exact, ExactJSPaymentPayload, ExactPaymentForm } from '../types'

let isLoaded = false

export default function Checkout() {
  const [exact, setExact] = useState<Exact | null>(null)

  const router = useRouter()
  const store = useCartState()

  const onExactJSReady = useCallback(() => {
    console.log("exactjs")
    if (isLoaded) {
      console.log("loaded")
      const components = exact?.components({ orderId: store.order?.orderId as string })
      console.debug(components)
      components?.remount();
      return
    }
    isLoaded = true

    console.log("Instantiating ExactJS")
    const newExact = ExactJS(store.order?.token as string)
    const components = newExact.components({ orderId: store.order?.orderId as string })

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

    console.debug(components)

    newExact.on("payment-complete", (payload: unknown) => {
      const paymentPayload = payload as ExactJSPaymentPayload
      console.debug(`MERCHANT payment complete: ${JSON.stringify(payload)}`);
      (document.getElementById('payment_id')! as HTMLInputElement).value = paymentPayload.paymentId;
      (document.getElementById('myForm') as HTMLFormElement).submit();
    })

    newExact.on("payment-failed", (payload) => {
      console.debug(`MERCHANT payment failed: ${JSON.stringify(payload)}`);
    })

    setExact(newExact)
  }, [store.order?.orderId])

  const handleSubmit = useCallback((event: FormEvent<ExactPaymentForm>) => {
    event.preventDefault()
    exact?.payOrder()
  }, [exact])

  //Prevent checkout with empty cart
  useEffect(() => {
    if (!store.order) {
      router.push('/')
    }
    console.log(`use effect: ${isLoaded}, ${store.order?.orderId}`)
    onExactJSReady()
  }, [store.order?.orderId])

  return (
    <>
      <div className={styles.checkoutdisclaimer}>
        <h1>Demonstration only.</h1>
        <h2>Payments are simulated and no actual funds are transferred.</h2>
        <h2><a href="https://developer.exactpay.com/docs/Sandbox-Test-Cards" target="_blank">TEST CARDS</a></h2>
      </div>

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

