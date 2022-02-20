import { HttpLink, from } from '@apollo/client'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { sha256 } from 'crypto-hash'
import { onError } from '@apollo/client/link/error'
import { v4 as uuidv4 } from 'uuid'
import consola from 'consola'
import ApolloLinkTimeout from 'apollo-link-timeout'
import { version } from '../../../package.json'
import config from '~/config'

const { END_POINT } = config
const errorLink = onError(({
  graphQLErrors, networkError, operation, forward,
// eslint-disable-next-line consistent-return
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
    consola.error(`[Network error]: ${networkError}`)
  }
})

const getHttpLink = ({ cookie }) => {
  // TODO:
  const headers = {
    'x-transaction-id': uuidv4(),
    'client-name': 'myClient',
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

// TODO: error 시 persistedQueriesLink 포함되어 있다면 조회 2번 함( 확인 필요 )
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
