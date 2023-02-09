declare global {
    let ExactJS: (key : string, locale? : {locale : string}) => Exact;
  }
export type Exact = {
    components : (order : {orderId : string}) => Component,
    payOrder : () => Promise<string>,
    on : (paymentState : "payment-complete" | "payment-failed", functionCall: (payload :ExactJSPayload) => void) => void,
    tokenize : () => void
}
export type Component =  {
    addCard : (divName : string, payload? : {"style"? : Styling, "wallets"? :boolean, label?: Label }) => void;
    addComponent : (divName : string, divId: string, payload? : {"style"? : Styling, "wallets"? :boolean, label?: Label }) => void;
}

export type ExactJSPayload = {
    paymentId : string
    token : string
    token_type : string
    token_last4 : string
    token_brand : string
    
}

export type Label = {
    //Labels
    position: "above" | "inside" | "none"
}
export type Styling = {
    
    default: Style,
    error?: Style,
    
}
export type Style = {
    //General Styling
    padding? : string,
    color? : string,
    fontFamily? : string,
    fontSize? : string,
    fontWeight? : string,
    textAlign? : string,
    textTransform? : string,
    textShadow? : string,
    fontStyle? :string,

    //Input Styling
    backgroundColor? : string,
    border? : string,
    borderRadius? : string,
    borderWidth? : string,
    borderColor? : string,

    
}

export interface ExactPaymentForm extends HTMLFormElement{
    closest : (form_name: string) => {
        submit : () => void
    }
}

export type Data = {
    token: string,
    orderId : string
  }

export type PaymentInfo = {

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