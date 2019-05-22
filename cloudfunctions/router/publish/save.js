module.exports = {
  main: async (event, context, cloud, database) => {
    const result = await database.collection('publish').add({
      data: {
        _openid: cloud.getWXContext().OPENID,
        text: event.text,
        tags: event.tags,
        activeMember: event.activeMember,
        isDeleted: false,
        createdAt: database.serverDate(),
        updatedAt: database.serverDate()
      }
    })
    return await database.collection('publish').where({
      _id: result._id,
      _openid: cloud.getWXContext().OPENID,
      isDeleted: false
    }).get()
  }
}