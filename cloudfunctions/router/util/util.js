module.exports = {
  main: async (event, context, cloud, database) => {
    const method = event.method
    const collection = event.collection
    const params = event.params
    const private = event.private
    if (private) {
      params.userId = cloud.getWXContext().OPENID
    }

    if (method === 'save') {
      return database.collection(collection).add({data: params})
    } else if (method === 'update') {
      return database.collection(collection).update({ data: params })
    } else if (method === 'search') {
      return database.collection(collection).get()
    } else if (method === 'delete') {
      return database.collection(collection).remove()
    }
  }
}