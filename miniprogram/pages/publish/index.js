const config = require("../../config.js")

Page({
  data: {
    text: '',
    tempFilePaths: [],
    tags: []
  },
  onLoad: function(options) {

  },
  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  changeText: function(e) {
    const text = e.detail.value
    this.setData({ text })
  },
  tapDeleteImage: function(e) {
    const index = e.currentTarget.dataset.index
    const that = this
    wx.showModal({
      title: '温馨提醒',
      content: '确定要删除该张图片吗？',
      success(res) {
        if (res.confirm) {
          that.data.tempFilePaths.splice(index, 1)
          that.setData({ tempFilePaths: that.data.tempFilePaths })
        }
      }
    })
  },
  tapChooseImage: function() {
    const that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({ tempFilePaths: that.data.tempFilePaths.concat(tempFilePaths) });
      }
    })
  },
  tapSelectTag: function(e) {
    const tag = e.currentTarget.dataset.tag
    let tags = this.data.tags
    const index = tags.indexOf(tag)
    if (index === -1) {
      tags.push(tag)
    } else {
      tags.splice(index, 1)
    }
    this.setData({ tags })
  },
  tapPublish: function() {
    if (this.data.text.length === 0) {
      wx.showToast({
        title: '请输入此刻的想法',
        icon: 'none',
        mask: true
      })
      return
    }
    if (this.data.tags.length === 0) {
      wx.showToast({
        title: '请选择标签',
        icon: 'none',
        mask: true
      })
      return
    }
    wx.showLoading({
      title: '发布中...',
      mask: true
    })
    const that = this
    wx.cloud.callFunction({
      name: 'router',
      data: {
        $url: 'publish-save',
        text: that.data.text,
        tags: that.data.tags
      }
    }).then(res => {
      const publish = res.result.data[0]
      const id = publish._id
      const tempFilePaths = that.data.tempFilePaths
      let fileIds = []
      for (let i = 0; i < tempFilePaths.length; i++) {
        const activeMember = wx.getStorageSync('activeMember')
        const index = tempFilePaths[i].lastIndexOf('.')
        const suffix = tempFilePaths[i].substring(index)
        wx.cloud.uploadFile({
          cloudPath: activeMember._openid + '/' + id + '/' + i + suffix,
          filePath: tempFilePaths[i],
        }).then(res => {
          const fileID = res.fileID
          fileIds.push(fileID)
          wx.cloud.callFunction({
            name: 'router',
            data: {
              $url: 'publish-updateFileId',
              _id: id,
              fileIds: fileIds
            }
          }).then(res => {
            wx.hideLoading()
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
})