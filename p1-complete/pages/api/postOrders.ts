import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import {AxiosRequestConfig} from 'axios'


type Data = {
  token: string,
  orderId : string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const options : AxiosRequestConfig = {
    method: 'POST',
    url: 'https://api.exactpaysandbox.com/orders',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Basic ${process.env.P1_API_KEY}`
    },
    data: {...req.body,
      terminal: {gateway_id: process.env.P1_GATEWAY_ID}
    }
  };
  await axios
    .request(options)
    .then( (response) => {
      res.status(200)
      res.json({
        token : response.data.access_token.token,
        orderId : response.data.id
      })

    })
    .catch( (error) => {
      console.error(error);
      res.status(401)
      res.end()
    });
  
}
