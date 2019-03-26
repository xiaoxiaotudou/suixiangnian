module.exports = {
  main: async (event, context, cloud, database) => {
    return database.collection('billReason').add({
      data: {
        _openid: cloud.getWXContext().OPENID,
        content: event.content,
        type: event.type,
        isDeleted: false,
        createdAt: database.serverDate(),
        updatedAt: database.serverDate()
      }
    })
  }
}