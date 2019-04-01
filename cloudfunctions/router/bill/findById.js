module.exports = {
  main: async (event, context, cloud, database) => {
    return database.collection('bill').where({
      _openid: cloud.getWXContext().OPENID,
      _id: event._id,
      isDeleted: false
    }).get()
  }
}