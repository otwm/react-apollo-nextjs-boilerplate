import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import { ValueOrPromise } from 'apollo-server-types'
import config from '~/config'

export default class RestaurantAPI extends RESTDataSource {
  constructor(readonly baseURL = config.API.RESTAURANT.URL) {
    super()
  }

  protected willSendRequest?(request: RequestOptions): ValueOrPromise<void> {
    request.headers.set('Accept', 'application/json')
  }

  async restaurants(restaurantSearch) {
    console.log(restaurantSearch)
    return [{
      id: 1,
      name: 'a',
      status: 'A',
      address: {
        address1: 'dd',
      }
    }]
    // return await this.get('/restaurants', restaurantSearch)
  }
}
