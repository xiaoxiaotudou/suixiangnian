module.exports = {
  main: async (event, context, cloud, database) => {
    database.collection('user').add({
      data: {
        _openid: cloud.getWXContext().OPENID,
        isDeleted: false,
        createdAt: database.serverDate(),
        updatedAt: database.serverDate()
      }
    })
    return database.collection('user').where({
      _openid: cloud.getWXContext().OPENID,
      isDeleted: false
    }).get()
  }
}