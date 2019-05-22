const config = require('../../config.js')
const location = require('../../utils/location.js')
const region = require('../../utils/region.js')

Page({
  onLoad: function() {
    this.checkAuthorization();
  },
  onShow: function() {
    const activeMember = wx.getStorageSync('activeMember')
    this.setData({ address: activeMember.address})

  },
  checkAuthorization: function() {
    if (!wx.getStorageSync('activeMember')) {
      wx.cloud.callFunction({
        name: 'router',
        data: {
          $url: 'user-findById',
        }
      }).then(res => {
        const result = res.result
        if (result.data.length == 0) {
          wx.cloud.callFunction({
            name: 'router',
            data: {
              $url: 'user-save',
            }
          }).then(res => {
            const result = res.result
            wx.setStorageSync('activeMember', result.data[0])
            this.getLocationName()
          }).catch(err => {
            console.log(err)
          })
        } else {
          wx.setStorageSync('activeMember', result.data[0])
          this.getLocationName()
        }
      }).catch(err => {
        console.log(err)
      });
    } else {
      this.getLocationName()
    }
  },
  getLocationName: function() {
    let activeMember = wx.getStorageSync('activeMember')
    if (!activeMember.address) {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userLocation'] === undefined) {
            wx.authorize({
              scope: "scope.userLocation",
              success() {

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
            
          }
        }
      })
    }
  },
  tapSelectAddress: function() {
    wx.navigateTo({
      url: '/pages/province/index',
    })
  }
})
