Page({
  onLoad: function (options) {
    this.setData({ 
      province: decodeURIComponent(options.province),
      city: decodeURIComponent(options.city),
      countys: JSON.parse(decodeURIComponent(options.countys))
    });
  },
  tapCounty: function(e) {
    const county = e.currentTarget.dataset.county;
    const that = this;
    wx.cloud.callFunction({
      name: 'router',
      data: {
        $url: 'user-updateAddress',
        address: that.data.province + that.data.city + county
      }
    }).then(res => {
      const result = res.result
      wx.setStorageSync('activeMember', result.data[0])
      wx.showToast({
        title: '保存成功~',
        icon: 'none'
      })
      wx.switchTab({
        url: '../index/index',
      })
    }).catch(err => {
      wx.showToast({
        title: '系统开小差了~',
        icon: 'none'
      })
    })
  }
})