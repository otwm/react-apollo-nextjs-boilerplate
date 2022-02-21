import { PORT } from './common'

const prod = {
  URL: 'http://localhost',
  PORT,
  END_POINT: `http://localhost:${PORT}/api/graphql`,
  ENVIRONMENT: 'prod',
  API: {
    TRACK: {
      URL: 'https://odyssey-lift-off-rest-api.herokuapp.com',
    }
  }
}

export default prod
