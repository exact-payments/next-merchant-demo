import { useCartState } from "../util/useCartState"

import styles from '../styles/Home.module.css'

import Script from 'next/script'
import axios from 'axios'
import { FormEvent, useEffect } from "react"
import { MutatingDots } from "react-loader-spinner"
import { useRouter } from "next/router"
import OrderTotal from "../components/OrderTotal"

import {Exact, ExactPaymentForm } from '../types'

export default  function Checkout() {
    let exact : Exact;

    const items = useCartState().items
      
    const getTotalPrice = () => {
        return  items.length * 100
    }

    const setOrderPosted = () => {
    (document.getElementById('hideable')! as HTMLInputElement).className = "";
    (document.getElementById('loading')! as HTMLInputElement).className = styles.hidden;
    }
    
    const  onExactJSReady = () => {
        const url = process.env.NEXT_PUBLIC_BASE_URL + '/api/postOrders'
        axios.post(url, {
        amount: getTotalPrice(), //Price is in cents
    }).then(
         (response) => {
            exact = ExactJS(response.data.token)
            const components = exact.components({orderId: response.data.orderId});
            components.addComponent('cardDiv', 'card-number', {
                label: {position: "inside"},
                style: {
                  default: {
                    borderRadius: "10px 10px 0px 0px",
                    borderWidth: "2px 2px 0px 2px",
                    borderColor: "red"
                  }
                }
              });
              components.addComponent('expiryDiv', 'expiry-date', {
                label: {position: "inside"},
                style: {
                  default: {
                    borderRadius: "0px 0px 0px 10px",
                    borderWidth: "0px 0px 2px 2px",
                    borderColor: "darkseagreen"
                  }
                }
              });
              components.addComponent('cvdDiv', 'cvd', {
                label: {position: "inside"},
                style: {
                  default: {
                    borderRadius: "0px 0px 10px 0px",
                    borderWidth: "0px 2px 2px 0px",
                    borderColor: "blue"
                  }
                }
              });
            setTimeout(setOrderPosted, 600);
        })
    }

    const handleSubmit = (event : FormEvent<ExactPaymentForm>) => {
        event.preventDefault()
    
        const form = event.currentTarget.closest("form");
        exact.payOrder()
            .then(payment_id => {
                // add the payment id to your form
            (document.getElementById('payment_id')! as HTMLInputElement).value  = payment_id
            form.submit()
            })
    .catch(err => console.error(err));
    }

    //Prevent checkout with empty cart
    const router = useRouter()
    useEffect(() => {
        if (!getTotalPrice()){
            router.push('/')
        }
    })

    return (
    <>
    <div className={styles.checkoutdisclaimer}>
        <h1>Demonstration only.</h1>
        <h2><a href="https://developer.exactpay.com/docs/test-cards/" target="_blank">TEST CARDS</a></h2>
    </div>
    <main className={styles.main}>
        <OrderTotal/>
        <div id="loading">
            <MutatingDots height="100" width="100" color="#4fa94d" secondaryColor= '#4fa94d' radius='12.5' ariaLabel="mutating-dots-loading"/>

            <Script src="https://api.exactpaysandbox.com/js/v1/exact.js" strategy="afterInteractive" onReady={onExactJSReady}/>
        </div>
        
        <div id="hideable" className={styles.hidden}>
        <form id="myForm" action="api/receivePaymentId" method="post" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" autoComplete="email" />
            </div>

            <div className={styles.carddivwrapper}>
            <div id="cardDiv" className={styles.carddiv}></div>
            <div id="expiryDiv"className={styles.expirydiv}></div>
            <div id="cvdDiv" className={styles.cvddiv}></div>
            </div>

            <div>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" autoComplete="street-address" />
            </div>

            <div>
                <label htmlFor ="apartment">Apartment, suite, etc.</label>
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

  