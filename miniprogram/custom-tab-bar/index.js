const config = require('../config.js')

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {

  },
  data: {
    selected: 0,
  },
  methods: {
    toIndex: function () {
      wx.switchTab({
        url: config.pages.index,
      })
    },
    toShare: function () {
      wx.switchTab({
        url: config.pages.share,
      })
    },
    toPublish: function () {
      wx.switchTab({
        url: config.pages.publish,
      })
    },
    toMessage: function () {
      wx.switchTab({
        url: config.pages.message,
      })
    },
    toProfile: function () {
      wx.switchTab({
        url: config.pages.profile,
      })
    }
  }
})
