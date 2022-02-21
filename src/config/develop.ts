import { PORT } from './common'

const develop = {
  URL: 'http://localhost',
  PORT,
  END_POINT: `http://localhost:${PORT}/api/graphql`,
  ENVIRONMENT: 'develop',
  API: {
    TRACK: {
      URL: 'https://odyssey-lift-off-rest-api.herokuapp.com',
    }
  }
}

export default develop
