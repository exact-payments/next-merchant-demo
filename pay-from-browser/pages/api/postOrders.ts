import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import {AxiosRequestConfig} from 'axios'

import {Data} from '../../types'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const options : AxiosRequestConfig = {
    method: 'POST',
    url: `https://api.exactpaysandbox.com/account/${process.env.P2_ACCOUNT_ID}/orders`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: process.env.APPLICATION_TOKEN
    },
    data: {
      ...req.body,
      reference: {referenceNo: "sample for demo"}
    }
  };
  await axios
    .request(options)
    .then( (response) => {
      res.status(200)
      console.log("\n\nPOST ORDER RESPONSE:\n")
      console.log(response.data)
      res.json({
        token : response.data.accessToken.token,
        orderId : response.data.id
      })

    })
    .catch( (error) => {
      console.error(error);
      res.status(401)
      res.end()
    });
  
}
