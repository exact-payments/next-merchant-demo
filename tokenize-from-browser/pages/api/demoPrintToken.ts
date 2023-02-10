import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try{
    res.json({
      "orderId" : process.env.orderId,
      "token" : process.env.token,
      "accountId" : process.env.P2_ACCOUNT_ID
    })
    res.status(200)
  }
  catch (error){
    console.error(error);
    res.status(501)
    res.end()
  }
}
