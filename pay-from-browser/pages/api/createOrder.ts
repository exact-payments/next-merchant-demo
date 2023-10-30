import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { AxiosRequestConfig } from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: `https://${process.env.NEXT_PUBLIC_P2_DOMAIN}/account/${process.env.P2_ACCOUNT_ID}/orders`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: process.env.APPLICATION_TOKEN
    },
    data: {
      amount: req.body.amount,
      reference: { referenceNo: "sample for demo" }
    }
  };
  await axios
    .request(options)
    .then((response) => {
      res.status(200)
      res.json({
        token: response.data.accessToken.token,
        orderId: response.data.id
      })
    })
    .catch((error) => {
      console.error(error);
      res.status(401)
      res.end()
    });
}
