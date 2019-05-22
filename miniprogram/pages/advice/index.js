Page({
  changeText: function (e) {
    const text = e.detail.value
    this.setData({ text })
  },
  tapSubmit: function() {
    if (!this.data.text) {
      wx.showToast({
        title: '请填写投诉或建议',
        icon: "none",
        mask: true
      })
      return
    }
    wx.cloud.callFunction({
      name: 'router',
      data: {
        $url: 'advice-save',
        text: this.data.text
      }
    }).then(res => {
      this.setData({ text: '' })
      wx.showToast({
        title: '提交成功',
        icon: "success",
        mask: true
      })
    }).catch(err => {
      console.log(err)
    })
  }
})