import RestaurantAPI from '~/apollo/server/datasources/RestaurantAPI'

const dataSources = () => ({
  restaurant: new RestaurantAPI(),
})

export default dataSources
