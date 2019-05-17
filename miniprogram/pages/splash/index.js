Page({
  onLoad: function() {
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
        }).catch(err => {
          console.log(err)
        })
      } else {
        wx.setStorageSync('activeMember', result.data[0])
      }
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        }
      })
    }).catch(err => {
      console.log(err)
    })
  },
  onGetUserInfo(e) {
    if (!e.detail.iv) {
      return;
    }
    const userInfo = e.detail.userInfo
    wx.cloud.callFunction({
      name: 'router',
      data: {
        $url: 'user-updateUserInfo',
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
      }
    }).then(res => {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }).catch(err => {
      console.log(err)
    })
  },
})