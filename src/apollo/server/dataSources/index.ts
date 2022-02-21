import TrackAPI from '~/apollo/server/dataSources/TrackAPI'

const dataSources = () => ({
  trackAPI: new TrackAPI()
})

export default dataSources
