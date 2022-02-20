import { HttpLink, from } from '@apollo/client'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { sha256 } from 'crypto-hash'
import { onError } from '@apollo/client/link/error'
import { v4 as uuidv4 } from 'uuid'
import ApolloLinkTimeout from 'apollo-link-timeout'
import { version } from '../../../package.json'
import config from '~/config'

const { END_POINT } = config
const errorLink = onError(({
  graphQLErrors, networkError, operation, forward,
}) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions?.code) {
        case 'UNAUTHENTICATED':
          // TODO: impl
          return forward(operation)
        default:
      }
    }
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

const getHttpLink = ({ cookie }) => {
  const headers = {
    'x-transaction-id': uuidv4(),
    'client-name': 'order-admin',
    'client-version': version,
    Cookie: '',
  }
  if (cookie) headers.Cookie = cookie
  return new HttpLink({
    uri: END_POINT,
    credentials: 'same-origin',
    headers,
  })
}

const persistedQueriesLink = createPersistedQueryLink({ sha256 })

const timeOutLink = new ApolloLinkTimeout(10000)

const isHttps = process.browser && /^https/.test(globalThis.location.href)

const getLink = ({ cookie }: { cookie?: string }) => {
  const links = [
    errorLink,
    timeOutLink,
    getHttpLink({ cookie }),
  ]

  const prodLinks = [
    errorLink,
    timeOutLink,
    persistedQueriesLink,
    getHttpLink({ cookie }),
  ]
  return from(isHttps ? prodLinks : links)
}

export default getLink
