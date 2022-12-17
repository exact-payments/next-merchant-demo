import axios from 'axios';
import { useEffect, useState } from 'react';

const fetchPaymentInfo = async () => {
    const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/demoPaymentInformation');
    return response.data;
};
type PaymentInfo = {

    id: string;
    paymentId: string;
    terminalId: string;
    merchantId: string;
    accountId: string;
    type: string;
    status: string;
    approved: boolean;
    captured: boolean;
    voided: boolean;
    refunded: boolean;
    settled: boolean;
    amount: number;
    sentToBank: boolean;
    createdAt: string;

};
export const PaymentInfoBox = () => {
    const [paymentInfo, setPaymentInfo] = useState({} as PaymentInfo);


    useEffect(() => {
        fetchPaymentInfo().then(response => {
            setPaymentInfo(response);
        });
    }, []
    );

    return (<>
        <h4>paymentInfo: </h4><br></br>
        <code>id: {paymentInfo.id}</code><br></br>
        <code>paymentId: {paymentInfo.paymentId}</code><br></br>
        <code>terminalId: {paymentInfo.terminalId}</code><br></br>
        <code>merchantId: {paymentInfo.merchantId}</code><br></br>
        <code>type: {paymentInfo.type}</code><br></br>
        <code>status: {paymentInfo.status}</code><br></br>
        <code>approved: {String(paymentInfo.approved)}</code><br></br>
        <code>captured: {String(paymentInfo.captured)}</code><br></br>
        <code>voided: {String(paymentInfo.voided)}</code><br></br>
        <code>refunded: {String(paymentInfo.refunded)}</code><br></br>
        <code>settled: {String(paymentInfo.settled)}</code><br></br>
        <code>amount (cents): {paymentInfo.amount}</code><br></br>
        <code>sentToBank: {String(paymentInfo.sentToBank)}</code><br></br>
        <code>createdAt: {paymentInfo.createdAt}</code><br></br>
    </>);
};
