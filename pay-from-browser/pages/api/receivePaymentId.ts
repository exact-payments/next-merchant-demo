import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //HERE YOU SHOULD SAVE THE PAYMENT TO YOUR SERVER!
  //We simulate this by saving the payment id to our environment 
    console.log("\n\nPAYMENT FORM SUBMITTED:\n")
    console.log(req.body)
    process.env.paymentId = req.body.payment_id
    res.redirect(302, `/paid`)
}
