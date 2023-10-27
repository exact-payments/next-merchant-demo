import axios from 'axios'
import { FormEvent, useEffect, useCallback, useState } from "react"
import { MutatingDots } from "react-loader-spinner"

import { useRouter } from "next/router"
import Script from 'next/script'

import { useCartState } from "../util/useCartState"
import { totalPrice, OrderTotal } from "../components/OrderTotal"

import styles from '../styles/Home.module.css'
import { Exact, ExactJSPaymentPayload, ExactPaymentForm } from '../types'

const exactJsSource = `https://${process.env.NEXT_PUBLIC_P2_DOMAIN}/js/v1/exact.js`

export default function Checkout() {
  const [exact, setExact] = useState<Exact | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const items = useCartState().items

  const onExactJSReady = useCallback(() => {
    setIsLoading(false)

    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/postOrders`, { 
      amount: totalPrice(items), //Price is in cents
    }).then((response) => {
      const newExact = ExactJS(response.data.token)
      const components = newExact.components({ orderId: response.data.orderId })

      components.addCard('cardElement', {
        label: { position: "above" },
        style: {
          default: {
            padding: '2px',
            border: "1px solid #ccc",
            fontSize: "14px",
          },
        },
        wallets: true
      })

      newExact.on("payment-complete", (payload: unknown) => {
        const paymentPayload = payload as ExactJSPaymentPayload

        (document.getElementById('payment_id')! as HTMLInputElement).value = paymentPayload.paymentId;
        (document.getElementById('myForm') as HTMLFormElement).submit();
      })

      newExact.on("payment-failed", (payload) => {
        console.debug(payload);
      })

      setExact(newExact)
    })
  }, [])

  const handleSubmit = useCallback((event: FormEvent<ExactPaymentForm>) => {
    event.preventDefault()
    exact?.payOrder()
  }, [exact])

  //Prevent checkout with empty cart
  useEffect(() => {
    if (!items) {
      router.push('/')
    }
  }, [])

  return (
    <>
      <Script src={exactJsSource} strategy="beforeInteractive" onReady={onExactJSReady} />
      <div className={styles.checkoutdisclaimer}>
        <h1>Demonstration only.</h1>
        <h2>Payments are simulated and no actual funds are transferred.</h2>
        <h2><a href="https://developer.exactpay.com/docs/Sandbox-Test-Cards" target="_blank">TEST CARDS</a></h2>
      </div>

      <main className={styles.main}>
        <OrderTotal />
        {(isLoading && (
          <div>
            <MutatingDots height="100" width="100" color="#4fa94d" secondaryColor='#4fa94d' radius='12.5' ariaLabel="mutating-dots-loading" />
          </div>
        ))}

        {(!isLoading && (
          <div id="paymentForm" className={styles.paymentForm}>
            <form id="myForm" action="api/receivePaymentId" method="post" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" autoComplete="email" />
              </div>
  
              <div id="cardElement" className={styles.paymentElement}>
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
        ))}
      </main>
    </>
  )
}

