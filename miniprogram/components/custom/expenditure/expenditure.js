const util = require('../../../utils/util.js')
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
    dateChange: function (event) {
      this.setData({
        selectedDate: event.detail.value
      })
    },
    init: function () {
      this.initSelectedDate()
    },
    initSelectedDate: function () {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      this.setData({
        selectedDate: year + "-" + month + "-" + day,
      })
    },
  }
})
