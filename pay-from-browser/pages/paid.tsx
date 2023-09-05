import Link from 'next/link'
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from 'styles/Home.module.css'
import PaymentInfoBox from '../components/PaymentInfoBox'
import { PaymentInfo } from '../types';
import { MutatingDots } from 'react-loader-spinner';

const fetchPaymentInfo = async () => {
  const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/demoPaymentInformation');
  return response.data;
};

export default function Paid() {
  const [paymentInfo, setPaymentInfo] = useState({} as PaymentInfo);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchPaymentInfo().then(response => {
      setPaymentInfo(response);
      setLoading(false);
    });
  }, [setPaymentInfo, setLoading]
  );

  if (loading) return (
    <main className={styles.main}>
      <MutatingDots height="100" width="100" color="#4fa94d"
        secondaryColor='#4fa94d' radius='12.5' ariaLabel="mutating-dots-loading" />
    </main>
  )
    ;
  else return (<>
    <main className={styles.main}>
      <h1>
        Thanks for shopping at the Exact Payments Plant Shop <br></br>
      </h1>
      <h3>
        The details of your payment have been sent to the server!
      </h3>
      <p>
        Displaying payment details from
        <a href="https://developer.exactpay.com/api#/paths/account-accountId--payments--paymentId/get">
          &nbsp;API&nbsp;
        </a>
        for demonstration
      </p>
      <div>

        <PaymentInfoBox paymentInfo={paymentInfo} />
      </div>
      <h1>
        <Link href='/'>Return to our homepage</Link>
      </h1>
    </main>
  </>)
}
