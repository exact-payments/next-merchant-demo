import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const options = {
      method: 'GET',
      url: `https://api.exactpaysandbox.com/orders/${process.env.orderId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.APPLICATION_TOKEN
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
