declare global {
    let ExactJS: (key : string) => Exact;
  }
export type Exact = {
    components : (order : {orderId : string}) => Component,
    payOrder : () => Promise<string>,
    on : (event : string, fc: (payload :ExactJSPayload) => void) => void,
}
export type Component =  {
    addCard : (divName : string, payload? : {"style"? : Styling, "wallets"? :boolean, label?: Label }) => void;
    addComponent : (divName : string, divId: string, payload? : {"style"? : Styling, "wallets"? :boolean, label?: Label }) => void;
}

export type ExactJSPayload = {
    paymentId : string
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