import {HttpLink, from, Observable, FetchResult} from '@apollo/client'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { sha256 } from 'crypto-hash'
import { onError } from '@apollo/client/link/error'
import { v4 as uuidv4 } from 'uuid'
import ApolloLinkTimeout from 'apollo-link-timeout'
import version from '../../../package.json'
import config from '~/config'
import { GraphQLError } from 'graphql'

const { END_POINT } = config

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((err: GraphQLError): void | Observable<FetchResult<Record<string, any>>> => {
      // TODO: Error 처리
      console.log('ERROR: ', err.extensions);

      if (err.extensions?.code === 'UNAUTHENTICATED') {
        console.log('UNAUTHENTICATED');
        // 로그인으로 가야됨.
        // why? 만료시간 이거나 유효하지 않는 token

        // 권한이 없고 n초 후 로그인페이지로 이동합니다 안내창이 필요
        // login(); // 바로 이동됨.. 왜 이동되는지 사용자가 모름..;;
        return forward(operation);
        // link 시킬 url 주소, 기본 메인 페이지로 redirect되어 페이지 권한처리로 이동 후 Login페이지로 이동
      }

      if (err.extensions?.code === 'FORBIDDEN') {
        console.log('FORBIDDEN');
      }

    });
  }

  if (networkError) {
    console.error(`[Network error!!]: ${networkError}`);
  }
});



const getHttpLink = ({ cookie }: { cookie: string| undefined }) => {
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
