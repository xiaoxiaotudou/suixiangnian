module.exports = {
  main: async (event, context, cloud, database) => {
    return database.collection('advice').add({
      data: {
        _openid: cloud.getWXContext().OPENID,
        text: event.text,
        isDeleted: false,
        createdAt: database.serverDate(),
        updatedAt: database.serverDate()
      }
    })
  }
}