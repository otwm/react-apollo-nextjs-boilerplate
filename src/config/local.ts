import { PORT } from './common'

const local = {
  URL: 'http://localhost',
  PORT,
  END_POINT: `http://localhost:${PORT}/api/graphql`,
  ENVIRONMENT: 'local',
  API: {
    TRACK: {
      URL: 'https://odyssey-lift-off-rest-api.herokuapp.com',
    }
  }
}

export default local
