import { PaymentInfo } from '../types';

interface PaymentInformation {
    paymentInfo: PaymentInfo
}

 const PaymentInfoBox = (props: PaymentInformation) => {
    
    const { paymentInfo } = props;

    return (<>
        <h4>paymentInfo: </h4><br></br>
        <code>id: {paymentInfo.id}</code><br></br>
        <code>paymentId: {paymentInfo.paymentId}</code><br></br>
        <code>status: {paymentInfo.status}</code><br></br>
        <code>amount (cents): {paymentInfo.amount}</code><br></br>
    </>);
};
export default PaymentInfoBox
