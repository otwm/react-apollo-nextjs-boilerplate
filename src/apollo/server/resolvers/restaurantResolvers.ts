const restaurantResolvers = {
  Query: {
    restaurant: async (
      _, { restaurantSearch }, { dataSources },
    ) => dataSources.restaurantAPI.restaurant(restaurantSearch),
  },
}

export default restaurantResolvers
