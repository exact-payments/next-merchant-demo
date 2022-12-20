import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //HERE YOU SHOULD SAVE THE PAYMENT TO YOUR SERVER!
  //We simulate this by saving the payment id to our environment
  console.log("here")
  const options = {
      method: 'GET',
      url: `https://api.exactpaysandbox.com/account/${process.env.P2_ACCOUNT_ID}/payments/${process.env.paymentId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.ORGANIZATION_APP_TOKEN
      }
    };
  
     await axios.request(options).then(function (response) {
      // console.log(response.data);
      console.log(req.body)
       res.json(response.data);
       res.status(200)

     }).catch(function (error) {
       console.error(error);
       res.status(501)
       res.end()
     });
  
    // }
}
