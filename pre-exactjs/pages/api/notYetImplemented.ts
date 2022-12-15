import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    res.redirect(200, 'not yet implemented!       please continue with the tutorial to implement this!')
  }