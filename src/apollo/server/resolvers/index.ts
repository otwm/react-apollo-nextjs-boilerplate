import GraphQLJSON from 'graphql-type-json'
import { mergeDeepRight, reduce } from 'ramda'
import restaurantResolvers from './restaurantResolvers'

const types = {
  JSON: GraphQLJSON,
}
const mergeDeepAll = reduce(mergeDeepRight, {} as any)
const resolvers: any = mergeDeepAll([
  types,
  restaurantResolvers,
])

export default resolvers
