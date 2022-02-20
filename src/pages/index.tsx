import React from 'react'
import { useRestaurantsQuery } from '@generated/src/apollo/document/restaurantHome.graphql'

const Home = () => {
  const { loading, error, data } = useRestaurantsQuery({
    variables: { restaurantSearch: { name: ''} }
  })
  console.log(loading, error, data)
  return (
    <div>1</div>
  )
}

export default Home
