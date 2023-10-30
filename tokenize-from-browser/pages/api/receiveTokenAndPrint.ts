//Example where we just save the token on the backend
//The order will not be paid until a call is made to the API

import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (!req.body.token || !req.body.order_id) {
    res.status(400).end()
  }
  console.log(req.body)

  //Here we save orderId & token to simulate a database
  process.env.orderId = req.body.order_id
  process.env.token = req.body.token
  process.env.cardBrand = req.body.card_brand
  process.env.expiryMonth = req.body.expiry_month
  process.env.expiryYear = req.body.expiry_year
  process.env.last4 = req.body.last4

  res.redirect(302, `/token`)
}
