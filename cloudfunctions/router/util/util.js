module.exports = {
  main: async (event, context, cloud, database) => {
    const method = event.method
    const collectionName = event.collectionName
    const params = event.params

    if (method === 'save') {
      return database.collection(collectionName).add({data: params})
    } else if (method === 'update') {
      return database.collection(collectionName).update({ data: params })
    } else if (method === 'search') {
      return database.collection(collectionName).get()
    } else if (method === 'delete') {
      return database.collection(collectionName).where({
        _id: params._id,
        _openid: cloud.getWXContext().OPENID
      }).update({
        data: {
          isDeleted: true,
          updatedAt: database.serverDate()
        }
      })
    }
  }
}