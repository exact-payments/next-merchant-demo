import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
type Data = {
  test: string
}
let paymentId = ""
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //HERE YOU SHOULD SAVE THE PAYMENT TO YOUR SERVER!
  //We simulate this by saving the payment id to our environment 
    process.env.paymentId = req.body.payment_id
    console.log(paymentId)
    res.redirect(302, `/paid`)
}
