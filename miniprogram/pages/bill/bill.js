Page({
  data: {
    bills: ['收入', '支出', '查询'],
    showDialog: false,
    selectedIndex: 2,
    date: "2018-12-25"
  },
  tabSelect: function (e) {
    const index = e.currentTarget.dataset.id
    const selectedIndex = this.data.selectedIndex
    if (index != selectedIndex && selectedIndex != 2) {
      this.setData({
        showDialog: true,
        tempIndex: index
      })
      return
    } else if (index != selectedIndex && selectedIndex == 2) {
      this.setData({
        tempIndex: index
      })
      this.confirmDialog()
    }
  },
  confirmDialog: function () {
    this.setData({
      showDialog: false,
      selectedIndex: this.data.tempIndex,
    })
  },
  cancelDialog: function () {
    this.setData({
      showDialog: false
    })
  },
  saveSuccess: function() {
     this.setData({
      tempIndex: 2
    })
    this.confirmDialog()
  },
  showPicker: function(event) {
    this.setData({
      showPicker: event.detail.showPicker
    })
  }
})