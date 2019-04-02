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
    initBillPayMethod: function() {
      wx.cloud.callFunction({
        name: 'router',
        data: {
          $url: 'billPayMethod-findAll',
        }
      }).then(res => {
        const result = res.result
        this.setData({
          selectedBillPayMethod: result.data[0]
        })
      }).catch(err => {
      })
    },
    selectBillCloseType: function() {
      this.setData({
        collectionName: 'billCloseType',
        showList: true,
        showAdd: false,
        showEdit: false,
        showDelete: false,
        descriptionDisabled: true
      })
    },
    selectBillPayMethod: function () {
      this.setData({
        collectionName: 'billPayMethod',
        showList: true,
        showAdd: false,
        showEdit: false,
        showDelete: false,
        descriptionDisabled: true
      })
    },
    saveDescription: function (event) {
      this.setData({
        description: event.detail.value
      })
    },
    edit: function(event) {
      wx.cloud.callFunction({
        name: 'router',
        data: {
          $url: 'bill-findById',
          _id: event.currentTarget.dataset.id
        }
      }).then(res => {
        const result = res.result
        if (result.data.length == 1) {
          const data = result.data[0]
          if (data.billCloseType == '已结') {
            this.setData({
              showBillPayMethod: true,
              selectedBillPayMethod: {
                _id: data.billPayMethodId,
                content: data.billPayMethod
              }
            })
          } else {
            this.setData({
              showBillPayMethod: false,
              selectedBillPayMethod: null
            })
          }
          this.setData({
            selectedBillCloseType: {
              _id: data.billCloseTypeId,
              content: data.billCloseType
            },
            showEditDialog: true,
            editId: event.currentTarget.dataset.id,
            description: data.description
          })
        }
      }).catch(err => {
      })
    },
    confirmEdit: function(event) {
      const id = event.currentTarget.dataset.id
      wx.cloud.callFunction({
        name: 'router',
        data: {
          $url: 'bill-edit',
          _id: this.data.editId,
          billCloseType: this.data.selectedBillCloseType,
          billPayMethod: this.data.selectedBillPayMethod,
          description: this.data.description
        }
      }).then(res => {
        const result = res.result
        this.cancelEdit()
        console.log(result.stats.updated)
        if (result.stats.updated == 1) {
          this.init()
          wx.showToast({
            title: '编辑成功~',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '编辑失败~',
            icon: 'none'
          })
        }
      }).catch(err => {
      })
    },
    cancelEdit: function(event) {
      this.setData({
        showEditDialog: false,
        editId: null,
        selectedBillCloseType: null,
        selectedBillPayMethod: null,
        description: null
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
        this.cancelDelete()
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
    selectedItem: function (event) {
      this.setData({
        showList: false,
        descriptionDisabled: false
      })
      const detail = event.detail
      const collectionName = detail.collectionName
      const selectedItem = detail.selectedItem
      if (collectionName == 'billCloseType') {
        this.setData({
          selectedBillCloseType: selectedItem
        })
        if (selectedItem.content == '已结') {
          this.setData({
            showBillPayMethod: true
          })
          if (this.data.selectedBillPayMethod == null) {
            this.initBillPayMethod()
          }
        } else {
          this.setData({
            showBillPayMethod: false,
            selectedBillPayMethod: null
          })
        }
      } else if (collectionName == 'billPayMethod') {
        this.setData({
          selectedBillPayMethod: selectedItem
        })
      }
    }
  }
})
