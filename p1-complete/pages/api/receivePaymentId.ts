import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body)

  
  //HERE YOU SHOULD SAVE THE PAYMENT TO YOUR SERVER!

  
  res.redirect(302, '/paid')

  
    
  
}
