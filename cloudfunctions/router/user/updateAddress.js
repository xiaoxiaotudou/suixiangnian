module.exports = {
  main: async (event, context, cloud, database) => {
    database.collection('user').where({
      _id: event._id,
      _openid: cloud.getWXContext().OPENID
    }).update({
      data: {
        address: event.address,
        updatedAt: database.serverDate()
      }
    })
    return database.collection('user').where({
      _openid: cloud.getWXContext().OPENID,
      isDeleted: false
    }).get()
  }
}