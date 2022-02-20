import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import initializeApollo from '~/apollo/client/initializeApollo'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  const { cookie } = pageProps
  const apolloClient = initializeApollo({ cookie })
  const initialState = JSON.stringify(apolloClient.extract())

  return (
    <>
      <Head>
        <title>react-apollo-next.js-boilerplate</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__APOLLO_STATE__ = ${initialState}
            `,
          }}
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export function reportWebVitals(metric) {
  // TODO: dev, qa, stage
  if (process.env.NODE_ENV !== 'production') console.log(metric)
}
