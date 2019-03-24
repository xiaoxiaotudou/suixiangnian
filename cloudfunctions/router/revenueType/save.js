module.exports = {
  main: async (event, context, cloud, database) => {
    return database.collection('revenueType').add({
      data: {
        _openid: cloud.getWXContext().OPENID,
        content: event.content,
        isDeleted: false,
        createdAt: database.serverDate(),
        updatedAt: database.serverDate()
      }
    })
  }
}