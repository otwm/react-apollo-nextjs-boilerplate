import { useViewerQuery } from '@generated/src/apollo/document/viewer.graphql'

const Index = () => {
  const { data, loading } = useViewerQuery()
  console.log('data',data, loading)
  return 1
}

export default Index
