import Link from 'next/link'
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from 'styles/Home.module.css'
import PaymentInfoBox from '../components/PaymentInfoBox'
import { TokenInfo } from '../types';
import { MutatingDots } from 'react-loader-spinner';

const fetchPaymentInfo = async () => {
    const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/demoPrintToken');
    return response.data;
};

export default function Paid () {
    const [tokenInfo, setTokenInfo] = useState({} as TokenInfo);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchPaymentInfo().then(response => {
            setTokenInfo(response);
            setLoading(false);
        });
    }, [setTokenInfo, setLoading]
    );

    if (loading) return (
    <main className={styles.main}>
    <MutatingDots height="100" width="100" color="#4fa94d" 
    secondaryColor= '#4fa94d' radius='12.5' ariaLabel="mutating-dots-loading"/>
    </main>
    )
    ;
    else return (<>
        <main className={styles.main}>
            <h1>
            Thanks for shopping at the Exact Plant Shop <br></br>
            </h1>
            <h3>
            Your payment was tokenized.
            </h3>
            <h3>
                <a href="https://developer.exactpay.com/api/#/operations/post-account-accountId-orders-orderId-pay"
                target="_blank">
                Pay for Order with Token
                </a>
            </h3>
            <p>
            Displaying info for demonstration.
            </p>
            <div>
            token: {tokenInfo.token}
            </div>
            <div>
            orderId: {tokenInfo.orderId}
            </div>
            <div>
            accountId: {tokenInfo.accountId}
            </div>
            
            
            <h1>
            <Link href='/'>Return to our homepage</Link>
            </h1>
        </main>
    </>)
}