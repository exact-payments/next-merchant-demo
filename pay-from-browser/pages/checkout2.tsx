import axios from 'axios'
import { FormEvent, useEffect, useCallback, useState } from "react"
import { MutatingDots } from "react-loader-spinner"

import { useRouter } from "next/router"

import { useCartState } from "../util/useCartState"
import { totalPrice, OrderTotal } from "../components/OrderTotal"

import styles from '../styles/Home.module.css'

import { Exact, ExactJSPaymentPayload, ExactPaymentForm } from '../types'

export default function Checkout() {
  const [exact, setExact] = useState<Exact | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const store = useCartState()

  const onExactJSReady = useCallback(() => {
    const newExact = ExactJS(store.order?.token as string)
    const components = newExact.components({ orderId: store.order?.orderId as string })

    components.addComponent('cardDiv', 'card-number', {
      label: { position: "inside" },
      style: {
        default: {
          borderRadius: "10px 10px 0px 0px",
          borderWidth: "2px 2px 0px 2px",
          borderColor: "red"
        }
      }
    });
    components.addComponent('expiryDiv', 'expiry-date', {
      label: { position: "inside" },
      style: {
        default: {
          borderRadius: "0px 0px 0px 10px",
          borderWidth: "0px 0px 2px 2px",
          borderColor: "darkseagreen"
        }
      }
    });
    components.addComponent('cvdDiv', 'cvd', {
      label: { position: "inside" },
      style: {
        default: {
          borderRadius: "0px 0px 10px 0px",
          borderWidth: "0px 2px 2px 0px",
          borderColor: "blue"
        }
      }
    });

    newExact.on("payment-complete", (payload: unknown) => {
      const paymentPayload = payload as ExactJSPaymentPayload
      console.debug(`MERCHANT payment complete: ${JSON.stringify(payload)}`);
      (document.getElementById('payment_id')! as HTMLInputElement).value = paymentPayload.paymentId;
      (document.getElementById('myForm') as HTMLFormElement).submit();
    });

    newExact.on("payment-failed", (payload) => {
      console.debug(`MERCHANT payment failed: ${JSON.stringify(payload)}`);
    });

    setExact(newExact);
  }, [])

  const handleSubmit = useCallback((event: FormEvent<ExactPaymentForm>) => {
    event.preventDefault()
    exact?.payOrder()
  }, [exact])

  //Prevent checkout with empty cart
  useEffect(() => {
    if (!store.order) {
      router.push('/')
    }
    console.log(`use effect: ${store.order?.orderId}`)
    onExactJSReady()
  }, [store.order?.orderId])

  return (
    <>
      <div className={styles.checkoutdisclaimer}>
        <h1>Demonstration only.</h1>
        <h2><a href="https://developer.exactpay.com/docs/test-cards/" target="_blank">TEST CARDS</a></h2>
      </div>

      <main className={styles.main}>
        <OrderTotal />
        <div id="paymentForm" className={styles.hidden}>
          <form id="myForm" action="api/receivePaymentId" method="post" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" autoComplete="email" />
            </div>

            <div className={styles.carddivwrapper}>
              <div id="cardDiv" className={styles.carddiv}></div>
              <div id="expiryDiv" className={styles.expirydiv}></div>
              <div id="cvdDiv" className={styles.cvddiv}></div>
            </div>

            <div>
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" autoComplete="street-address" />
            </div>

            <div>
              <label htmlFor="apartment">Apartment, suite, etc.</label>
              <input type="text" id="apartment" name="apartment" />
            </div>

            <div>
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" />
            </div>

            <div>
              <label htmlFor="province">State</label>
              <input type="text" id="province" name="province" />
            </div>

            <div>
              <label htmlFor="postcode">Postal code</label>
              <input type="text" id="postcode" name="postcode" autoComplete="postal-code" />
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

