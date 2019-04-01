module.exports = {
  main: async (event, context, cloud, database) => {
    return database.collection('bill').where({
      _id: event._id,
      _openid: cloud.getWXContext().OPENID
    }).update({
      data: {
        isDeleted: true,
        updatedAt: database.serverDate()
      }
    })
  }
}