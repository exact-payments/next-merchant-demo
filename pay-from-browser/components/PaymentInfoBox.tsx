import { PaymentInfo } from '../types';

interface PaymentInformation {
    paymentInfo: PaymentInfo
}

 const PaymentInfoBox = (props: PaymentInformation) => {
    
    const { paymentInfo } = props;

    return (<>
        
        <h4>paymentInfo: </h4><br></br>
        <code>
            POST /account/{paymentInfo.accountId}/payments/{paymentInfo.paymentId}
        </code><br></br>
        <br></br>
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
export default PaymentInfoBox
