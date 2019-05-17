module.exports = {
  main: async (event, context, cloud, database) => {
    return database.collection('user').where({
      _openid: cloud.getWXContext().OPENID,
      isDeleted: false
    }).get()
  }
}