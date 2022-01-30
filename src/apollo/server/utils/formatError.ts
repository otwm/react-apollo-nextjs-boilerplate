import { ApolloError } from 'apollo-server-micro'

const formatError = (error: ApolloError) => error

export default formatError
