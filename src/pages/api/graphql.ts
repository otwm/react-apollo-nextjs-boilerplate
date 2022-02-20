import apolloServer from '~/apollo/server'
import { NextApiRequest, NextApiResponse } from 'next'

const startServer = apolloServer.start()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // res.setHeader('Access-Control-Allow-Credentials', 'true')
  // res.setHeader(
  //   'access-control-allow-methods',
  //   'POST'
  // )
  // res.setHeader(
  //   'Access-Control-Allow-Origin',
  //   'https://studio.apollographql.com'
  // )
  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'Origin, X-Requested-With, Content-Type, Accept'
  // )
  // if (req.method === 'OPTIONS') {
  //   res.end()
  //   return false
  // }

  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api:  {
    bodyParser:  false
  }
}


