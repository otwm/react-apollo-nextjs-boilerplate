import { useViewerQuery } from '~/apollo/document/viewer.graphql'

const a = () => {
  const { data, loading } = useViewerQuery()
  console.log('data',data, loading)
  return 1
}

export default a
