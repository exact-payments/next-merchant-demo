import { useCartState } from "../util/useCartState"

import styles from '../styles/Home.module.css'

import Script from 'next/script'
import axios from 'axios'
import { useState, FormEvent, useEffect } from "react"
import { MutatingDots } from "react-loader-spinner"
import { useRouter } from "next/router"
import OrderTotal from "../components/OrderTotal"

declare global {
    let ExactJS: (key : string) => Exact;
  }
type Exact = {
    components : (order : {orderId : string}) => Component,
    payOrder : () => Promise<string>,
    on : (event : string, fc: (action :string) => void) => void,
}
type Component =  {
    addCard : (divName : string, payload? : {"style"? : Styling, "wallets"? :boolean, label?: Label }) => void;
    addComponent : () => void;
}


type Label = {
    //Labels
    position: "above" | "inside" | "none"
}
type Styling = {
    
    default: Style,
    error?: Style,
    
}
type Style = {
    //General Styling
    padding? : string,
    color? : string,
    fontFamily? : string,
    fontSize? : string,
    fontWeight? : string,
    textAlign? : string,
    textTransform? : string,
    textShadow? : string,
    fontStyle? :string,

    //Input Styling
    backgroundColor? : string,
    border? : string,
    borderRadius? : string,
    borderWidth? : string,
    borderColor? : string,

    
}

interface ExactPaymentForm extends HTMLFormElement{
    closest : (form_name: string) => {
        submit : () => void
    }
}

export default  function Checkout() {
    const items = useCartState().items
    let exact : Exact;

    
      
    const getTotalPrice = () => {
        return  items.length * 100
    }

    

    const setOrderPosted = () => {
    (document.getElementById('hideable')! as HTMLInputElement).className = "";
    (document.getElementById('loading')! as HTMLInputElement).className = styles.hidden;
}
    

    const  onExactJSReady = () => {
         //Price is in cents
        const url = process.env.NEXT_PUBLIC_BASE_URL + '/api/postOrders'
        axios.post(url, {
        amount: getTotalPrice(),
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
                    // default: {
                    //     fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,\
                    //     Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;",
                    //     color: "#000000"
                    // }
                }});
            setTimeout(setOrderPosted, 600);
        })
    }

    const handleSubmit = async (event : FormEvent<ExactPaymentForm>) => {
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

    //Prevent checkout with empty
    const router = useRouter()
    useEffect(() => {
        if (!getTotalPrice()){
            router.push('/')
        }
    })


    return (
    <main className={styles.main}>
        <OrderTotal/>
        <div id="loading">
            <MutatingDots height="100" width="100" color="#4fa94d" secondaryColor= '#4fa94d' radius='12.5' ariaLabel="mutating-dots-loading"/>

            <Script src="https://api.exactpaysandbox.com/js/v1/exact.js" strategy="afterInteractive" onReady={onExactJSReady}/>
        </div>
        <div id="hideable" className={styles.hidden}>
        <form id="myForm" action="api/receivePaymentId" method="post"  onSubmit={handleSubmit}>
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
    
    )
        
    
}

  