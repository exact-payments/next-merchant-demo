import Link from 'next/link'
import styles from 'styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

const fetchPaymentInfo = async () => {
    const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/demoPaymentInformation')
    return response.data
}


export default function Paid () {

    const [paymentInfo, setPaymentInfo] = useState("")
    
        
     useEffect(() => {
        fetchPaymentInfo().then(response => {
            setPaymentInfo(JSON.stringify(response, null, 2))
        })
     }, []
     )

        
    

    return (<>
        <main className={styles.main}>
            <h1>
            Thanks for shopping at the Exact Plant Shop <br></br>
            </h1>
            <h3>
            The details of your payment have been sent to the server!
            </h3>
            <p>
                Displaying them for demonstration. 
            </p>
            <p>
                {paymentInfo}
            </p>
            <h1>
            <Link href='/'>Return to our homepage</Link>

            </h1>
        </main>
    </>)
}