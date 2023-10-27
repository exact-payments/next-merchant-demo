import { useCartState } from "../util/useCartState"

import styles from '../styles/Home.module.css'

import Script from 'next/script'
import axios from 'axios'
import { FormEvent, useEffect } from "react"
import { MutatingDots } from "react-loader-spinner"
import { useRouter } from "next/router"
import OrderTotal, { totalPrice } from "../components/OrderTotal"

import { Exact, ExactJSTokenPayload, ExactPaymentForm } from '../types'

export default function Checkout() {
  let exact: Exact;

  const exactJsSource = `https://${process.env.NEXT_PUBLIC_P2_DOMAIN}/js/v1/exact.js`

  const items = useCartState().items

  const setOrderPosted = () => {
    (document.getElementById('hideable')! as HTMLInputElement).className = "";
    (document.getElementById('loading')! as HTMLInputElement).className = styles.hidden;
  }

  const onExactJSReady = () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + '/api/postOrders'
    axios.post(url, {
      amount: totalPrice(items), //Price is in cents
    }).then(
      (response) => {
        exact = ExactJS(response.data.token)
        const components = exact.components({ orderId: response.data.orderId });
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
            type: "minimal",
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
          (document.getElementById('token')! as HTMLInputElement).value = tokenPayload.token;
          (document.getElementById('card_brand')! as HTMLInputElement).value = tokenPayload.card_brand;
          (document.getElementById('expiry_month')! as HTMLInputElement).value = tokenPayload.expiry_month;
          (document.getElementById('expiry_year')! as HTMLInputElement).value = tokenPayload.expiry_year;
          (document.getElementById('last4')! as HTMLInputElement).value = tokenPayload.last4;
          (document.getElementById('order_id')! as HTMLInputElement).value = response.data.orderId;
          (document.getElementById('myForm') as HTMLFormElement).submit();
        });

        exact.on("payment-failed", (payload) => {
          console.debug(payload);
        });
        setTimeout(setOrderPosted, 1100);
      })
  }


  const handleSubmit = (event: FormEvent<ExactPaymentForm>) => {
    event.preventDefault()
    exact.tokenize()
    return false
  }

  //Prevent checkout with empty cart
  const router = useRouter()
  useEffect(() => {
    if (!items) {
      router.push('/')
    }
  })

  return (
    <>
      <div className={styles.checkoutdisclaimer}>
        <h1>2-Pass Tokenized Payment</h1>
        <h2><a href="https://developer.exactpay.com/docs/test-cards/" target="_blank">TEST CARDS</a></h2>
      </div>

      <main className={styles.main}>
        <OrderTotal />
        <div id="loading">
          <MutatingDots height="100" width="100" color="#d8908f" secondaryColor='#d8908f' radius='12.5' ariaLabel="mutating-dots-loading" />

          <Script src={exactJsSource} strategy="afterInteractive" onReady={onExactJSReady} />
        </div>

        <div id="hideable" className={styles.hidden}>
          <form id="myForm" action="api/receiveTokenAndPrint" method="post" onSubmit={handleSubmit}>
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

