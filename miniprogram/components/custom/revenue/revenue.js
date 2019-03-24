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
            disabled: true
          })
        } else {
          this.setData({
            disabled: false
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
      this.setData({
        showList: true,
        showAdd: true,
        showEdit: true,
        showDelete: true,
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
    billTypeChange: function(event) {
      this.setData({
        billTypeIndex: event.detail.value
      })
    },
    billCloseTypeChange: function(event) {
      this.setData({
        billCloseTypeIndex: event.detail.value
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
          revenueTypeId: that.data.revenueTypes[that.data.revenueTypeIndex]._id,
          revenueType: that.data.revenueTypes[that.data.revenueTypeIndex].content,
          total: that.data.totalAmount,
          actual: that.data.actualAmount,
          billTypeId: that.data.billTypes[that.data.billTypeIndex]._id,
          billType: that.data.billTypes[that.data.billTypeIndex].content,
          billCloseTypeId: that.data.billCloseTypes[that.data.billCloseTypeIndex]._id,
          billCloseType: that.data.billCloseTypes[that.data.billCloseTypeIndex].content,
          description: that.data.description,
          createdAt: database.serverDate(),
          isDeleted: false
        }
      }).then(res => {
        that.triggerEvent('customevent', {}, {})
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
          revenueTypes: res.data
        })
      })
    },
    initBillType: function() {
      database.collection('billType').get().then(res => {
        this.setData({
          billTypes: res.data
        })
      })
    },
    initBillCloseType: function() {
      database.collection('billCloseType').get().then(res => (
        this.setData({
          billCloseTypes: res.data
        })
      ))
    },
    selectedItem: function(event) {
      const detail = event.detail
      console.log(detail)
    }
  }
})
