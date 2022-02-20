import React from 'react'
import App from 'next/app'
import { ApolloProvider } from '@apollo/client'
import consola from 'consola'
import Head from 'next/head'
import initializeApollo from '~/apollo/client/initializeApollo'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    // fix: https://github.com/vercel/next.js/blob/master/errors/no-document-title.md
    const { cookie } = pageProps
    const apolloClient = initializeApollo({ cookie })
    const initialState = JSON.stringify(apolloClient.extract())
    return (
      <>
        <Head>
          <title>order-admin</title>
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
}

export function reportWebVitals(metric) {
  // TODO: dev, qa, stage
  if (process.env.NODE_ENV !== 'production') consola.log(metric)
}

export default MyApp
