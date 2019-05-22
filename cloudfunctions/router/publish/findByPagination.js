module.exports = {
  main: async (event, context, cloud, database) => {
    const result = await database.collection('publish').where({
      isDeleted: false
    }).count()
    const total = result.total
    if (total != 0) {
      const publishs = await database.collection('publish').where({
        isDeleted: false
      }).orderBy('updatedAt', 'desc').skip((event.currentPage - 1) * 10).limit(10).get()
      return { data: publishs.data, total: total }
    } else {
      return { data: [] }
    }
  }
}