import { PORT } from './common'

const qa = {
  URL: 'http://localhost',
  PORT,
  END_POINT: `http://localhost:${PORT}/api/graphql`,
  ENVIRONMENT: 'qa',
  API: {
    TRACK: {
      URL: 'https://odyssey-lift-off-rest-api.herokuapp.com',
    }
  }
}

export default qa
