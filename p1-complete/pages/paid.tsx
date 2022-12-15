import Link from 'next/link'
import styles from 'styles/Home.module.css'
export default function Paid () {
    console.log()
    return (<>
        <main className={styles.main}>
            <h1>
            Thanks for shopping at the Exact Plant Shop <br></br>
            </h1>
            <h3>
            The details of your payment have been sent to the server!
            </h3>
            <h1>
            <Link href='/'>Return to our homepage</Link>

            </h1>
        </main>
    </>)
}