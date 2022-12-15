//const exactJS = await import('https://api.exactpaysandbox.com/js/v1/exact.js')
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useCartState } from '../util/useCartState'
export default function Checkout() {
    const [items, setItems] = useState(useCartState().items)

    const getFormattedPrice = () => {
        return "$" + (items.length*10) + ".00"

    }
    
    return (
        <main className={styles.main}>
        <div>

        <h3>Your Order Total: {getFormattedPrice()}</h3>
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


  