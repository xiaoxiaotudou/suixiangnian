const util = require('../../../utils/util.js')
const config = require('../../../config.js')
const database = wx.cloud.database()

Component({
  properties: {
    showDialog: {
      type: Boolean,
      observer: function(newValue) {
        if (newValue) {
          this.setData({
            descriptionDisabled: true
          })
        } else {
          this.setData({
            descriptionDisabled: false
          })
        }
      }
    },
    type: {
      type: String,
      observer: function (newValue) {
        this.setData({
          type: newValue
        })
        this.init()
      }
    }
  },
  methods: {
    dateChange: function(event) {
      this.setData({
        selectedDate: event.detail.value
      })
    },
    selectBillReason: function(event) {
      this.triggerEvent('showpicker', {showPicker: true})
      this.setData({
        collectionName: 'billReason_' + this.data.type,
        showList: true,
        showAdd: true,
        showEdit: true,
        showDelete: true,
        descriptionDisabled: true
      })
    },
    saveTotal: function(event) {
      this.setData({
        totalAmount: event.detail.value
      })
    },
    saveBase: function(event) {
      this.setData({
        actualAmount: event.detail.value
      })
    },
    selectBillType: function(event) {
      this.triggerEvent('showpicker', {showPicker: true})
      this.setData({
        collectionName: 'billType',
        showList: true,
        showAdd: false,
        showEdit: false,
        showDelete: false,
        descriptionDisabled: true
      })
    },
    selectBillCloseType: function(event) {
      this.triggerEvent('showpicker', {showPicker: true})
      this.setData({
        collectionName: 'billCloseType',
        showList: true,
        showAdd: false,
        showEdit: false,
        showDelete: false,
        descriptionDisabled: true
      })
    },
    saveDescription: function(event) {
      this.setData({
        description: event.detail.value
      })
    },
    submit: util.throttle(function(that) {
      if (that.data.type == 'revenue' && that.data.totalAmount == undefined) {
        wx.showToast({
          title: '请填写收入~',
          icon: 'none'
        })
        return
      }
      if (that.data.actualAmount == undefined) {
        wx.showToast({
          title: '请填写成本~',
          icon: 'none'
        })
        return
      }
      database.collection('bill').add({
        data: {
          billDate: that.data.selectedDate,
          type: that.data.type,
          billReasonId: that.data.selectedBillReason._id,
          billReason: that.data.selectedBillReason.content,
          total: that.data.totalAmount,
          actual: that.data.actualAmount,
          billTypeId: that.data.selectedBillType._id,
          billType: that.data.selectedBillType.content,
          billCloseTypeId: that.data.selectedBillCloseType._id,
          billCloseType: that.data.selectedBillCloseType.content,
          description: that.data.description,
          createdAt: database.serverDate(),
          updatedAt: database.serverDate(),
          isDeleted: false
        }
      }).then(res => {
        that.triggerEvent('savesuccess', {})
        wx.showToast({
          title: '保存成功~',
          icon: 'none'
        })
      }).catch(err => {
        console.log(err)
        wx.showToast({
          title: '系统开小差了~',
          icon: 'none'
        })
      })
    }),
    init: function() {
      this.initSelectedDate()
      this.initBillReason()
      this.initBillType()
      this.initBillCloseType()
    },
    initSelectedDate: function() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      this.setData({
        selectedDate: year + "-" + month + "-" + day,
      })
    },
    initBillReason: function() {
      wx.cloud.callFunction({
        name: 'router',
        data: {
          $url: 'billReason-findAll',
          type: this.data.type
        }
      }).then(res => {
        const result = res.result
        if (result.data.length > 0) {
          this.setData({
            selectedBillReason: result.data[0]
          })
        } else {
          this.setData({
            selectedBillReason: ''
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    initBillType: function() {
      wx.cloud.callFunction({
        name: 'router',
        data: {
          $url: 'billType-findAll',
        }
      }).then(res => {
        const result = res.result
        this.setData({
          selectedBillType: result.data[0]
        })
      }).catch(err => {
      })
    },
    initBillCloseType: function() {
      wx.cloud.callFunction({
        name: 'router',
        data: {
          $url: 'billCloseType-findAll',
        }
      }).then(res => {
        const result = res.result
        this.setData({
          selectedBillCloseType: result.data[0]
        })
      }).catch(err => {
      })
    },
    selectedItem: function(event) {
      this.triggerEvent('showpicker', {showPicker: false})
      this.setData({
        showList: false,
        descriptionDisabled: false
      })
      const detail = event.detail
      const collectionName = detail.collectionName
      const selectedItem = detail.selectedItem
      if (collectionName == 'billReason') {
        this.setData({
          selectedBillReason: selectedItem
        })
      } else if (collectionName == 'billType') {
        this.setData({
          selectedBillType: selectedItem
        })
      } else if (collectionName == 'billCloseType') {
        this.setData({
          selectedBillCloseType: selectedItem
        })
      }
    }
  }
})
