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
    selectBillPayMethod: function(event) {
      this.triggerEvent('showpicker', { showPicker: true })
      this.setData({
        collectionName: 'billPayMethod',
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
      wx.cloud.callFunction({
        name: 'router',
        data: {
          $url: 'bill-save',
          billDate: that.data.selectedDate,
          type: that.data.type,
          billReason: that.data.selectedBillReason,
          total: that.data.totalAmount,
          actual: that.data.actualAmount,
          billType: that.data.selectedBillType,
          billCloseType: that.data.selectedBillCloseType,
          billPayMethod: that.data.selectedBillPayMethod,
          description: that.data.description,
        }
      }).then(res => {
        that.triggerEvent('savesuccess', {})
        wx.showToast({
          title: '保存成功~',
          icon: 'none'
        })
      }).catch(err => {
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
        if (result.data[0].content == '已结') {
          this.setData({
            showBillPayMethod: true
          })
          this.initBillPayMethod()
        } else {
          this.setData({
            showBillPayMethod: false,
            selectedBillPayMethod: null
          })
        }
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
        if (selectedItem.content == '已结') {
          this.setData({
            showBillPayMethod: true
          })
          this.initBillPayMethod()
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
