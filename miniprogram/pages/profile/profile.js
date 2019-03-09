const config = require("../../config.js")

Page({
  data: {
    profileSelected: true
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
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
  },
  toBill: function () {
    wx.navigateTo({
      url: config.pages.bill,
    })
  }
})