module.exports = {
  main: async (event, context, cloud, database) => {
    const result = await database.collection('billType').count()
    const total = result.total
    const batchTimes = Math.ceil(total / 2)
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = database.collection('billType').where({
        isDeleted: false
      }).orderBy('updatedAt', 'desc').skip(i * 2).limit(2).get()
      tasks.push(promise)
    }
    return (await Promise.all(tasks)).reduce((total, item) => ({
      data: total.data.concat(item.data),
    }))
  }
}