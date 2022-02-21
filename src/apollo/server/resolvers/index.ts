import { mergeDeepArray } from '@apollo/client/utilities'
import viewerResolver from './viewerResolver'
import trackResolver from './trackResolver'

const resolvers = mergeDeepArray([
  trackResolver,
  viewerResolver,
])

export default resolvers
