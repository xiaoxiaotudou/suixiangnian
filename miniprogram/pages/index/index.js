const QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js')

Page({
  onLoad: function() {
    this.getLocation();
  },
  onShow: function() {
    const activeMember = wx.getStorageSync('activeMember')
    if (activeMember.address) {
      this.setData({ address: activeMember.address })
    }
  },
  getLocation: function() {
    const that = this
    let activeMember = wx.getStorageSync('activeMember')
    if (!activeMember.address) {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userLocation'] === undefined) {
            wx.authorize({
              scope: "scope.userLocation",
              success() {
                that.getAutoLocation()
              },
              fail() {
                wx.navigateTo({
                  url: '../province/index',
                })    
              }
            })
          } else if (!res.authSetting['scope.userLocation']) {
            wx.navigateTo({
              url: '../province/index',
            })
          } else {
            that.getAutoLocation()
          }
        }
      })
    }
  },
  getAutoLocation: function() {
    const that = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const qqmapsdk = new QQMapWX({ key: 'DOWBZ-DFJWJ-TCIFD-KTQOE-MASNV-XUFDN' })
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success(res) {
            const address = res.result.address
            wx.cloud.callFunction({
              name: 'router',
              data: {
                $url: 'user-updateAddress',
                address: address
              }
            }).then(res => {
              const result = res.result
              that.setData({ address: address })
              wx.setStorageSync('activeMember', result.data[0])
            }).catch(err => {
              console.log(err)
            })
          }
        })
      }
    })
  },
  tapSelectAddress: function() {
    wx.navigateTo({
      url: '/pages/province/index',
    })
  }
})
