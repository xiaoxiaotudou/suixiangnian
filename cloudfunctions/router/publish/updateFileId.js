module.exports = {
  main: async (event, context, cloud, database) => {
    database.collection('publish').where({
      _id: event._id,
      _openid: cloud.getWXContext().OPENID
    }).update({
      data: {
        fileIds: event.fileIds,
        updatedAt: database.serverDate()
      }
    })
    return await database.collection('publish').where({
      _id: event._id,
      _openid: cloud.getWXContext().OPENID,
      isDeleted: false
    }).get()
  }
}