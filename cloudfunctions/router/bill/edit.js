module.exports = {
  main: async (event, context, cloud, database) => {
    let data = {
      billCloseTypeId: event.billCloseType._id,
      billCloseType: event.billCloseType.content,
      description: event.description,
      updatedAt: database.serverDate()
    }
    if (event.billPayMethod != null) {
      data.billPayMethodId = event.billPayMethod._id
      data.billPayMethod = event.billPayMethod.content
    }
    return await database.collection('bill').where({
      _id: event._id,
      _openid: cloud.getWXContext().OPENID
    }).update({
      data: data
    })
  }
}