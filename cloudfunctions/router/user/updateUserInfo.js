module.exports = {
  main: async (event, context, cloud, database) => {
    return database.collection('user').where({
      _id: event._id,
      _openid: cloud.getWXContext().OPENID
    }).update({
      data: {
        nickName: event.nickName,
        avatarUrl: event.avatarUrl,
        updatedAt: database.serverDate()
      }
    })
  }
}