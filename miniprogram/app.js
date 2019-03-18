const config = require("config.js")

App({
  onLaunch: function () {
    wx.hideTabBar()
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: config.env,
        traceUser: true
      })
    }

    this.globalData = {}
  }
})
