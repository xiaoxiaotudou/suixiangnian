module.exports = {
  main: async (event, context, cloud, database) => {
    let data = {
      _openid: cloud.getWXContext().OPENID,
      billDate: event.billDate,
      type: event.type,
      billReasonId: event.billReason._id,
      billReason: event.billReason.content,
      total: event.total,
      actual: event.actual,
      billTypeId: event.billType._id,
      billType: event.billType.content,
      billCloseTypeId: event.billCloseType._id,
      billCloseType: event.billCloseType.content,
      description: event.description,
      isDeleted: false,
      createdAt: database.serverDate(),
      updatedAt: database.serverDate()
    }
    if (event.billPayMethod != null) {
      data.billPayMethodId = event.billPayMethod._id
      data.billPayMethod = event.billPayMethod.content
    }
    return database.collection('bill').add({
      data: data
    })
  }
}