//index.js
const config = require("../../config.js")

Page({
  data: {
    indexSelected: true
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  onLoad: function() {
    this.checkAuthorization()
  },
  checkAuthorization: function() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
            }
          })
        }
      }
    })
  },
  tapInput: function() {
    wx.navigateTo({
      url: config.pages.input,
    })
  },
  tapOutput: function () {
    wx.navigateTo({
      url: config.pages.output,
    })
  },
  tapSearch: function () {
    wx.cloud.callFunction({
      name: 'router',
      data: {
        $url: 'test',
        method: 'save',
        collection: 'inputType',
        params: {
          'test': '123456999998888888'
        }
      }
    }).then((res) =>
      console.log(res.result)
    )
  },
  toIndex: function() {
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
})
