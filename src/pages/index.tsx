import React, { FC } from "react";
import { useViewerQuery } from '@generated/src/apollo/document/viewer.graphql'
import {
  GetSimpleTrackDocument,
  GetSimpleTrackQuery,
  useGetTracksQuery
} from '@generated/src/apollo/document/track.graphql'
import initializeApollo from '~/apollo/client/initializeApollo'
import { GetServerSideProps } from 'next'

interface IndexProps {
  simpleTrack: GetSimpleTrackQuery
  apolloState: any
}

const Index: FC<IndexProps> = ({ simpleTrack}) => {
  const { data, loading } = useViewerQuery()
  const { data: data2, loading: loading2, error } = useGetTracksQuery()

  console.log('data',data, loading)
  console.log('data2',data2, loading2, error)
  console.log('simpleTrack', simpleTrack)

  return (
    <div>
      {data?.viewer?.name}
    </div>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { cookie } = req.headers
  const apolloClient = initializeApollo({ cookie })
  const { data: simpleTrack } = await apolloClient.query({ query: GetSimpleTrackDocument })
  return {
    props: {
      simpleTrack,
      apolloState: apolloClient.extract(),
    },
  }
}
