import { mergeDeepRight, reduce } from 'ramda'
const mergeDeepAll = reduce(mergeDeepRight, {} as any)
const resolvers: any = mergeDeepAll([])

export default resolvers
