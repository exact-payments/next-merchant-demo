//Example where we pay using token on the backend

import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
)
{

  if (!req.body.token || !req.body.order_id){
    res.status(400).end()
  }
  console.log(req.body.order_id)

    //Here we save orderId to simulate a database
    process.env.orderId = req.body.order_id

    //Here we pay for order on the backend
    const options = {
      method: 'POST',
      url: `https://api.exactpaysandbox.com/account/${process.env.P2_ACCOUNT_ID}/orders/${req.body.order_id}/pay`,
      headers: {
        accept: 'application/json', 
        'content-type': 'application/json',
        authorization: process.env.APPLICATION_TOKEN
      },
      data: {payment_method: {token: req.body.token}}
    };
    axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
    res.redirect(302, `/paid`)
}
