const config = require("../../config.js")

Page({
  onLoad: function(options) {

  },
  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }
  },
  toBill: function() {
    wx.navigateTo({
      url: config.pages.bill,
    })
  },
  toAdvice: function() {
    wx.navigateTo({
      url: config.pages.advice,
    })
  },
  toHelper: function () {
    wx.navigateTo({
      url: config.pages.helper,
    })
  }
})