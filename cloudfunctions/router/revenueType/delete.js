module.exports = {
  main: async (event, context, cloud, database) => {
    await database.collection('revenueType').where({
      _id: event._id,
      _openid: cloud.getWXContext().OPENID
    }).update({
      data: {
        isDeleted: true,
        updatedAt: database.serverDate()
      }
    })
    return cloud.callFunction({
      name: 'router',
      data: {
        $url: 'revenueType-save',
        content: event.content
      }
    })
  }
}