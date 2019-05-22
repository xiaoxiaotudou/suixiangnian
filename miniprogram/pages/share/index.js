const config = require("../../config.js")

Page({
  data: {
    shares: []
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    this.getShares(1)
  },
  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  tapToBottom: function() {
    const currentPage = this.data.currentPage
    const pageCount = Math.ceil(this.data.total / 10)
    if (currentPage < pageCount) {
      this.getShares(currentPage + 1)
    }
  },
  getShares: function(currentPage) {
    wx.cloud.callFunction({
      name: 'router',
      data: {
        $url: 'publish-findByPagination',
        currentPage: currentPage,
      }
    }).then(res => {
      const result = res.result
      this.setData({
        shares: this.data.shares.concat(result.data),
        currentPage: currentPage,
        total: result.total
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
    })
  },
  tapImage: function(e) {
    const fileId = e.currentTarget.dataset.fileId
    wx.previewImage({
      urls: [fileId]
    })
  }
})