const viewerResolver = {
  Query: {
    viewer: async (
      _, __,
    ) => {
      return {
        id: 1,
        name: 'kdo',
        status: 'ok'
      }
    }
  },
}

export default viewerResolver
