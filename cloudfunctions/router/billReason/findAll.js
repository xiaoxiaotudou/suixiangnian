module.exports = {
  main: async (event, context, cloud, database) => {
    const result = await database.collection('billReason').where({
      _openid: cloud.getWXContext().OPENID,
      isDeleted: false,
      type: event.type
    }).count()
    const total = result.total
    if (total != 0) {
      const batchTimes = Math.ceil(total / 100)
      const tasks = []
      for (let i = 0; i < batchTimes; i++) {
        const promise = database.collection('billReason').where({
          _openid: cloud.getWXContext().OPENID,
          isDeleted: false,
          type: event.type
        }).orderBy('updatedAt', 'desc').skip(i * 100).limit(100).get()
        tasks.push(promise)
      }
      return (await Promise.all(tasks)).reduce((total, item) => ({
        data: total.data.concat(item.data),
      }))
    } else {
      return {data: []}
    }
  }
}