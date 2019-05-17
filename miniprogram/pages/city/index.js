Page({
  onLoad: function(options) {
    this.setData({
      province: decodeURIComponent(options.province),
      citys: JSON.parse(decodeURIComponent(options.citys))
    });
  },
  tapCity: function(e) {
    const city = e.currentTarget.dataset.city;
    const countys = e.currentTarget.dataset.countys;
    if (countys.length !== 0) {
      wx.navigateTo({
        url: `../county/index?countys=${encodeURIComponent(JSON.stringify(countys))}&city=${encodeURIComponent(city)}&province=${encodeURIComponent(this.data.province)}`,
      })
    } else {
      const that = this;
      wx.cloud.callFunction({
        name: 'router',
        data: {
          $url: 'user-updateAddress',
          address: that.data.province + city
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
  },
})