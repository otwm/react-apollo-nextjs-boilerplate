import { mergeDeepArray } from '@apollo/client/utilities'
import viewerResolver from './viewerResolver'

const resolvers = mergeDeepArray([
  viewerResolver,
])

export default resolvers
