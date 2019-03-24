module.exports = {
  main: async (event, context, cloud, database) => {
    const method = event.method
    const collectionName = event.collectionName
    const params = event.params

    if (method === 'save') {
      return database.collection(collectionName).add({data: params})
    } else if (method === 'update') {
      return database.collection(collectionName).update({ data: params })
    } else if (method === 'findAll') {
      const result = await database.collection(collectionName).count()
      const total = result.total
      const batchTimes = Math.ceil(total/2)
      const tasks = []
      for (let i = 0; i < batchTimes; i++) {
        const promise = database.collection(collectionName).where({
          _openid: cloud.getWXContext().OPENID,
          isDeleted: false
        }).orderBy('updatedAt', 'desc').skip(i * 2).limit(2).get()
        tasks.push(promise)
      }
      return (await Promise.all(tasks)).reduce((total, item) => ({
        data: total.data.concat(item.data),
      }))
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