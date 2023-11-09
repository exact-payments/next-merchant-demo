import { FormEvent, useCallback, useEffect } from "react"
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

    components.addComponent('addressDiv', 'address', {
      billingAddress: {
        type: 'full',
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
    });

    exact.on("payment-failed", (payload) => {
      console.debug(`MERCHANT payment failed: ${JSON.stringify(payload)}`);
    });
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

            <div className={styles.carddivwrapper}>
              <div id="cardDiv" className={styles.carddiv}></div>
              <div id="expiryDiv" className={styles.expirydiv}></div>
              <div id="cvdDiv" className={styles.cvddiv}></div>
            </div>

            <div id="addressDiv" className={styles.paymentElement}></div>

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
