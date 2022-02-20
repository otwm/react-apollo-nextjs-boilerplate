import { ApolloServerPlugin } from 'apollo-server-plugin-base'
import consola from 'consola'

const loggingPlugin: ApolloServerPlugin = {
  async serverWillStart() {
    consola.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
    consola.log(`process.env.SERVER: ${process.env.SERVER}`)
  },
  async requestDidStart(requestContext) {
    console.log(requestContext)
    return {
      async didResolveOperation(ctx) {
        const headers = ctx.request?.http?.headers
        const transactionId = headers?.get('x-transaction-id')
        consola.log('didResolveOperation start!')
        consola.log(`operation name: ${ctx.operationName}`)
        consola.log(`transactionId: ${transactionId}`)
      },
    }
  },
}

export default loggingPlugin
