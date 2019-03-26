module.exports = {
  main: async (event, context, cloud, database) => {
    await database.collection('billReason').where({
      _id: event._id,
      _openid: cloud.getWXContext().OPENID
    }).update({
      data: {
        isDeleted: true,
        updatedAt: database.serverDate()
      }
    })
    return database.collection('billReason').add({
      data: {
        _openid: cloud.getWXContext().OPENID,
        type: event.type,
        content: event.content,
        isDeleted: false,
        createdAt: database.serverDate(),
        updatedAt: database.serverDate()
      }
    })
  }
}