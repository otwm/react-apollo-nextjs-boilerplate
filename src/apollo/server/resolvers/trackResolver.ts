const trackResolver = {
  Query: {
    tracksForHome: async (
      _, __, { dataSources },
    ) => dataSources.trackAPI.getTracksForHome(),
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) => dataSources.trackAPI.getAuthor(authorId),
  }
}

export default trackResolver
