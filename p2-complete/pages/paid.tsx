import Link from 'next/link'
import styles from 'styles/Home.module.css'
import PaymentInfoBox from '../components/PaymentInfoBox'
import dynamic from 'next/dynamic'

const DynamicPaymentInfoBox = dynamic(() => import('../components/PaymentInfoBox') ,{
    ssr: false
})
export default function Paid () {
    return (<>
        <main className={styles.main}>
            <h1>
            Thanks for shopping at the Exact Plant Shop <br></br>
            </h1>
            <h3>
            The details of your payment have been sent to the server!
            </h3>
            <p>
            Displaying payment details for demonstration
            </p>
            <p>
            <DynamicPaymentInfoBox/>
            </p>
            <h1>
            <Link href='/'>Return to our homepage</Link>
            </h1>
        </main>
    </>)
}