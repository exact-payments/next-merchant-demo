import styles from '../styles/Home.module.css'
import OrderTotal from '../components/OrderTotal'
import {Exact, ExactPaymentForm } from '../types'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCartState } from '../util/useCartState';

export default function Checkout() {
    let exact : Exact; //We will be setting this as a part of the tutorial

    const items = useCartState().items
      
    const getTotalPrice = () => {
        return  items.length * 100
    }

    //Prevent checkout with empty cart
    const router = useRouter()
    useEffect(() => {
        if (!getTotalPrice()){
            router.push('/')
        }
    })
    
    return (
        <main className={styles.main}>
        <div>

        <OrderTotal />
        <form id="myForm" action="api/notYetImplemented" method="post" >
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

    )
        
    
}


  