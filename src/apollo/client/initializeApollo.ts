import { ApolloClient, InMemoryCache } from '@apollo/client'
import getLink from '~/apollo/client/getLink'

interface createApolloClientParam {
  initialState?: Record<string, unknown>,
  cookie?: string
}

const createApolloClient = ({ initialState, cookie }: createApolloClientParam) => {
  const connectToDevTools = process.env.NODE_ENV !== 'production'
  // eslint-disable-next-line no-underscore-dangle
  const cache = initialState ? new InMemoryCache().restore(globalThis.__APOLLO_STATE__) : new InMemoryCache()
  return new ApolloClient({
    ssrMode: true,
    link: getLink({ cookie }),
    cache,
    credentials: 'same-origin',
    connectToDevTools,
    ssrForceFetchDelay: 500,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
      },
      mutate: {
        errorPolicy: 'none',
      },
    },
  })
}

const initializeApollo = ({ cookie, initialState }: createApolloClientParam) => {
  if (process.browser) {
    return createApolloClient({ initialState })
  }
  return createApolloClient({ initialState, cookie })
}

export default initializeApollo
