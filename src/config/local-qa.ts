import { PORT } from './common'

const localQa = {
  URL: 'http://localhost',
  PORT,
  END_POINT: `http://localhost:${PORT}/api/graphql`,
  ENVIRONMENT: 'qa',
}

export default localQa
