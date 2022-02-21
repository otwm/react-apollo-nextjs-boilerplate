// TODO: impl your context
const user = {
  id: 1,
  name: 'kdo',
}

const context = async ({ req }) => {
  console.log('context log req :', req.query)
  return {
    user
  }
}

export default context
