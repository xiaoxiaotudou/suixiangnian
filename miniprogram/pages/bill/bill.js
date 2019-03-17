Page({
  data: {
    revenueSelected: true,
    expenditureSelected: false,
    billSelected: false,
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
    if (index != selectedIndex) {
      this.setData({
        showDialog: true,
        tempIndex: index
      })
      return
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
})