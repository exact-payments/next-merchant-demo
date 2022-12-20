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
        return  items.length * 1000
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
            components.addCard('cardElement', {
                label: {position: "above"},
                style: {
                    default: {
                        border: "1px solid #ccc",
                        fontSize: "14px",
                      },
                }});


        exact.on("payment-complete", (payload) => {
            console.log(payload);
       //     (document.getElementById('payment_id')! as HTMLInputElement).value  = payment_id

            (document.getElementById('myForm') as HTMLFormElement).submit();
            });
            
            exact.on("payment-failed", (payload) => {
            console.debug(payload);
            });
            setTimeout(setOrderPosted, 1100);
        })
    }

    
    const handleSubmit = (event : FormEvent<ExactPaymentForm>) => {
        event.preventDefault()
    
    //    const form = event.currentTarget.closest("form");
        exact.payOrder()
    
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

            <div id="cardElement" >

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

  