import { PORT } from './common'

const stage = {
  URL: 'http://localhost',
  PORT,
  END_POINT: `http://localhost:${PORT}/api/graphql`,
  ENVIRONMENT: 'stage',
  API: {
    TRACK: {
      URL: 'https://odyssey-lift-off-rest-api.herokuapp.com',
    }
  }
}

export default stage
