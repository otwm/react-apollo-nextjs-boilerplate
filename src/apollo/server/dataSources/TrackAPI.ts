import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'
import config from '~/config'
import { ValueOrPromise } from 'apollo-server-types'

export default class TrackAPI extends RESTDataSource {
  constructor(readonly baseURL = config.API.TRACK.URL) {
    super()
  }

  protected willSendRequest?(request: RequestOptions): ValueOrPromise<void> {
    request.headers.set('Accept', 'application/json')
    request.headers.set('X-Trace-Id', this.context.headers?.['x-transaction-id'])
  }

  async getTracksForHome() {
    return this.get('/tracks')
  }

  getAuthor(authorId) {
    return this.get(`/author/${authorId}`)
  }
}
