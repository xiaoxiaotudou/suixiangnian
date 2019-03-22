Page({
  data: {
    revenueSelected: true,
    expenditureSelected: false,
    billSelected: false,
    // revenueSelected: false,
    // expenditureSelected: false,
    // billSelected: true,
    bills: ['收入', '支出', '查询'],
    showDialog: false,
    selectedIndex: 0,
    date: "2018-12-25"
  },
  onLoad: function (options) {
  },
  onShow: function () {
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
    const selectedIndex = this.data.selectedIndex
    if (selectedIndex == 0) {
      this.setData({
        revenueSelected: true,
        expenditureSelected: false,
        billSelected: false,

      })
    } else if (selectedIndex == 1) {
      this.setData({
        revenueSelected: false,
        expenditureSelected: true,
        billSelected: false
      })
    } else if (selectedIndex == 2) {
      this.setData({
        revenueSelected: false,
        expenditureSelected: false,
        billSelected: true
      })
    }
  },
  cancelDialog: function () {
    this.setData({
      showDialog: false
    })
  },
  customEvent: function() {
    console.log(11111111)
    this.setData({
      tempIndex: 2
    })
    this.confirmDialog()
  }
})