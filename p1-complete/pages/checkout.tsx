import { useCartState } from "../util/useCartState"
import Script from 'next/script'
import axios from 'axios'
import { useState, FormEvent } from "react"
import styles from '../styles/Home.module.css'


declare global {
    let ExactJS: (key : string) => Exact;
  }
type Exact = {
    components : (order : {orderId : string}) => Component
    payOrder : () => Promise<string>;

}
type Component =  {
    addCard : (divName : string) => void;
    addComponent : () => void;
}

interface ExactPaymentForm extends HTMLFormElement{
    closest : (form_name: string) => {
        submit : () => void
    }
}

export default  function Checkout() {
    const [items, setItems] = useState(useCartState().items)
    let exact : Exact;

    const  onExactJSReady = () => {
        const totalPrice =  items.length * 100 //Price is in cents
        const url = process.env.NEXT_PUBLIC_BASE_URL + '/api/postOrders'
        axios.post(url, {
        amount: totalPrice,
    }).then(
         (response) => {
            exact = ExactJS(response.data.token)
            const components = exact.components({orderId: response.data.orderId});
            components.addCard('cardElement');
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
    
    return (
        <>
        <main className={styles.main}>
        
        <Script src="https://api.exactpaysandbox.com/js/v1/exact.js" strategy="afterInteractive" onReady={onExactJSReady}/>

        
        <div>
        <form id="myForm" action="api/receivePaymentId" method="post"  onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" name="email" autoComplete="email" />
            </div>

            <div id="cardElement">

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
                <label htmlFor="province">Province</label>
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

  