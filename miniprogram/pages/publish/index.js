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
      count: 4,
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
  tapPublish: async function() {
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
    let id = ''
    let fileIds = []
    const activeMember = wx.getStorageSync('activeMember')
    await wx.cloud.callFunction({
      name: 'router',
      data: {
        $url: 'publish-save',
        text: this.data.text,
        tags: this.data.tags,
        activeMember: activeMember
      }
    }).then(res => {
      const publish = res.result.data[0]
      id = publish._id
    }).catch(err => {
      console.log(err)
    })
    const tempFilePaths = this.data.tempFilePaths
    for (let i = 0; i < tempFilePaths.length; i++) {
      const index = tempFilePaths[i].lastIndexOf('.')
      const suffix = tempFilePaths[i].substring(index)
      await wx.cloud.uploadFile({
        cloudPath: activeMember._openid + '/' + id + '/' + i + suffix,
        filePath: tempFilePaths[i],
      }).then(res => {
        const fileID = res.fileID
        fileIds.push(fileID)
      }).catch(err => {
        console.log(err)
      })
    }
    await wx.cloud.callFunction({
      name: 'router',
      data: {
        $url: 'publish-updateFileId',
        _id: id,
        fileIds: fileIds
      }
    }).then(res => {
      this.setData({
        text: '',
        tempFilePaths: [],
        tags: []
      })
      wx.hideLoading()
      wx.showToast({
        title: '发布成功！请耐心等待管理员审核',
        icon: 'none'
      })
    }).catch(err => {
      console.log(err)
    })
  }
})