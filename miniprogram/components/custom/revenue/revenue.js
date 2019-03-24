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
    }
  },
  data: {
    revenueTypeIndex: 0,
    billTypeIndex: 0,
    billCloseTypeIndex: 0
  },
  lifetimes: {
    attached() {
      this.init()
    }
  },
  methods: {
    dateChange: function(event) {
      this.setData({
        selectedDate: event.detail.value
      })
    },
    selectRevenueType: function(event) {
      this.triggerEvent('showpicker', {showPicker: true})
      this.setData({
        collectionName: 'revenueType',
        showList: true,
        showAdd: true,
        showEdit: true,
        showDelete: true,
        descriptionDisabled: true
      })
    },
    saveRevenue: function(event) {
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
      if (that.data.totalAmount == undefined) {
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
          type: 'revenue',
          revenueTypeId: that.data.selectedRevenueType._id,
          revenueType: that.data.selectedRevenueType.content,
          total: that.data.totalAmount,
          actual: that.data.actualAmount,
          billTypeId: that.data.selectedBillType._id,
          billType: that.data.selectedBillType.content,
          billCloseTypeId: that.data.selectedBillCloseType._id,
          billCloseType: that.data.selectedBillCloseType.content,
          description: that.data.description,
          createdAt: database.serverDate(),
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
      this.initRevenueType()
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
    initRevenueType: function() {
      database.collection('revenueType').get().then(res => {
        this.setData({
          selectedRevenueType: res.data[0]
        })
      })
    },
    initBillType: function() {
      database.collection('billType').get().then(res => {
        this.setData({
          selectedBillType: res.data[0]
        })
      })
    },
    initBillCloseType: function() {
      database.collection('billCloseType').get().then(res => (
        this.setData({
          selectedBillCloseType: res.data[0]
        })
      ))
    },
    selectedItem: function(event) {
      this.triggerEvent('showpicker', {showPicker: false})
      this.setData({
        showList: false
      })
      const detail = event.detail
      const collectionName = detail.collectionName
      const selectedItem = detail.selectedItem
      if (collectionName == 'revenueType') {
        this.setData({
          selectedRevenueType: selectedItem
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
