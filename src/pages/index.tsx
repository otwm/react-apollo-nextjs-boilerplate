import { useViewerQuery } from '@generated/src/apollo/document/viewer.graphql'
import { useGetTracksQuery } from '@generated/src/apollo/document/track.graphql'

const Index = () => {
  const { data, loading } = useViewerQuery()
  const { data: data2, loading: loading2, error } = useGetTracksQuery()
  console.log('data',data, loading)
  console.log('data2',data2, loading2, error)
  return (
    <div>
      {data?.viewer?.name}
    </div>
  )
}

export default Index
