import {AppProps, NextWebVitalsMetric} from 'next/app'
import { ApolloProvider } from '@apollo/client'
import Head from 'next/head'
import {useApollo} from '~/apollo/client/useApollo'

function App({ Component, pageProps }: AppProps) {
  const { cookie, apolloState: initialState } = pageProps
  const apolloClient = useApollo({ initialState, cookie })
  return (
    <>
      <Head>
        <title>react-apollo-next.js-boilerplate</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (process.env.NODE_ENV !== 'production') console.log(metric)
}

export default App