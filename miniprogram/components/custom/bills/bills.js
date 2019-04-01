const config = require('../../../config.js')
const database = wx.cloud.database()

Component({
  properties: {

  },
  data: {

  },
  lifetimes: {
    attached() {
      this.init()
    }
  },
  methods: {
    init: function() {
      wx.cloud.callFunction({
        name: 'router',
        data: {
          $url: 'bill-findAll',
        }
      }).then(res => {
        const result = res.result
        this.setData({
          bills: result.data
        })
        let revenueTotal = 0
        let revenueTotalY = 0
        let revenueTotalN = 0
        let revenueActual = 0
        let revenueActualY = 0
        let revenueActualN = 0
        let expenditureActual = 0
        let expenditureActualY = 0
        let expenditureActualN = 0
        this.data.bills.forEach(bill => {
          console.log(bill)
          if (bill.type == 'expenditure') {
            if (bill.billCloseType == '已结') {
              expenditureActualY += Number(bill.actual)
            } else {
              expenditureActualN += Number(bill.actual)
            }
            expenditureActual += Number(bill.actual)
          } else {
            if (bill.billCloseType == '已结') {
              revenueTotalY += Number(bill.total)
              revenueActualY += Number(bill.total - bill.actual)
            } else {
              revenueTotalN += Number(bill.total)
              revenueActualN += Number(bill.total - bill.actual)
            }
            revenueTotal += Number(bill.total)
            revenueActual += Number(bill.total - bill.actual)
          }
        })
        this.setData({
          revenueTotal: revenueTotal,
          revenueTotalY: revenueTotalY,
          revenueTotalN: revenueTotalN,
          revenueActual: revenueActual,
          revenueActualY: revenueActualY,
          revenueActualN: revenueActualN,
          expenditureActual: expenditureActual,
          expenditureActualY: expenditureActualY,
          expenditureActualN: expenditureActualN
        })
      }).catch(err => {
      })
    },
    edit: function(event) {
      const id = event.currentTarget.dataset.id
      wx.cloud.callFunction({
        name: 'router',
        data: {
          $url: 'bill-findById',
          _id: id
        }
      }).then(res => {
        const result = res.result
        this.setData({
          bill: result.data
        })
      }).catch(err => {
      })
    },
    delete: function (event) {
      this.setData({
        showDeleteDialog: true,
        deleteId: event.currentTarget.dataset.id
      })
    },
    confirmDelete: function(event) {
      const id = this.data.deleteId
      wx.cloud.callFunction({
        name: 'router',
        data: {
          $url: 'bill-delete',
          _id: id
        }
      }).then(res => {
        const result = res.result
        this.setData({
          showDeleteDialog: false,
          deleteId: null
        })
        if (result.stats.updated == 1) {
          this.init()
          wx.showToast({
            title: '删除成功~',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '删除失败~',
            icon: 'none'
          })
        }
      }).catch(err => {
        wx.showToast({
          title: '系统开小差了~',
          icon: 'none'
        })
      })
    },
    cancelDelete: function(event) {
      this.setData({
        showDeleteDialog: false,
        deleteId: null
      })
    },
    touchStart: function(event) {
      this.setData({
        touchStart: event.touches[0].pageX
      })
    },
    touchMove: function(event) {
      this.setData({
        touchDirection: event.touches[0].pageX - this.data.touchStart > 0 ? 'right' : 'left'
      })
    },
    touchEnd: function(event) {
      if (this.data.touchDirection == 'left') {
        this.setData({
          moveLeftIndex: event.currentTarget.dataset.id
        })
      } else {
        this.setData({
          moveLeftIndex: null
        })
      }
      this.setData({
        touchDirection: null
      })
    },
  }
})
