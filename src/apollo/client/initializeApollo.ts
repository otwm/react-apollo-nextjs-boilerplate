import {ApolloClient, InMemoryCache, NormalizedCacheObject} from '@apollo/client'
import getLink from '~/apollo/client/getLink'
import {mergeDeepLeft} from "ramda";

export interface createApolloClientParam {
  initialState?: Record<string, unknown>,
  cookie?: string
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

const createApolloClient = ({ cookie }: createApolloClientParam) => {
  const connectToDevTools = process.env.NODE_ENV !== 'production'
  // eslint-disable-next-line no-underscore-dangle
  const cache = new InMemoryCache()
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
    },
  })
}

const initializeApollo = ({ cookie, initialState }: createApolloClientParam) => {
  const _apolloClient = apolloClient ?? createApolloClient({ cookie });

  // Next.js에서 Apollo Client를 이용해 데이터를 가져오는 함수가 있다면, 초기 상태값이 여기에서 합쳐진다.
  if (initialState) {
    // 클라이언트에서의 받은 데이터인 현재 캐시 데이터를 가져온다.
    const existingCache = _apolloClient.extract()
    // 현재 캐시와 SSR 메소드인 getStaticProps/getServerSideProps로 부터 받은 데이터를 합친다.
    const data = mergeDeepLeft<object, object>(initialState, existingCache)
    // 합쳐진 데이터를 저장한다.
    _apolloClient.cache.restore(data)
  }

  // SSG(Server Side Generation)와 SSR(Server Side Rendering)은 항상 새로운 Apollo Client를 생성한다.
  if (typeof window === 'undefined') {
    return _apolloClient
  }

  // 클라이언트의 Apollo Client는 한 번만 생성한다.
  if (!apolloClient) {
    apolloClient = _apolloClient
  }

  return _apolloClient
}

export default initializeApollo
