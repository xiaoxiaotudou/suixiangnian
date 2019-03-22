const config = require('../../../config.js')
const database = wx.cloud.database()

Component({
  properties: {

  },
  data: {

  },
  lifetimes: {
    attached() {
      this.init()
    }
  },
  methods: {
    init: function() {
      database.collection('bill').count().then(res => {
        this.setData({
          total: res.total
        })
        database.collection('bill').orderBy('createdAt', 'desc').get().then(res => {
          this.setData({
            bills: res.data
          })
        })
      })
    }
  }
})
