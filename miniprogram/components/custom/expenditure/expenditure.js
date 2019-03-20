const util = require('../../../utils/util.js')
const config = require('../../../config.js')
const database = wx.cloud.database()

Component({
  properties: {

  },
  data: {
    expenditureTypeIndex: 0,
    billTypeIndex: 0,
    billCloseTypeIndex: 0
  },
  lifetimes: {
    attached() {
      this.init()
    }
  },
  methods: {
    dateChange: function (event) {
      this.setData({
        selectedDate: event.detail.value
      })
    },
    expenditureTypeChange: function (event) {
      this.setData({
        expenditureTypeIndex: event.detail.value
      })
    },
    saveExpenditure: function (event) {
      this.setData({
        totalAmount: event.detail.value
      })
    },
    billTypeChange: function (event) {
      this.setData({
        billTypeIndex: event.detail.value
      })
    },
    billCloseTypeChange: function (event) {
      this.setData({
        billCloseTypeIndex: event.detail.value
      })
    },
    saveDescription: function (event) {
      this.setData({
        description: event.detail.value
      })
    },
    submit: util.throttle(function (that) {
      if (that.data.totalAmount == undefined) {
        wx.showToast({
          title: '请填写支出~',
          icon: 'none'
        })
        return
      }
      database.collection('expenditure').add({
        data: {
          expenditureDate: that.data.selectedDate,
          expenditureTypeId: that.data.expenditureTypes[that.data.expenditureTypeIndex]._id,
          total: that.data.totalAmount,
          billTypeId: that.data.billTypes[that.data.billTypeIndex]._id,
          billCloseTypeId: that.data.billCloseTypes[that.data.billCloseTypeIndex]._id,
          description: that.data.description,
          createdAt: database.serverDate()
        }
      }).then(res => {
        that.triggerEvent('customevent', {}, {})
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
    init: function () {
      this.initSelectedDate()
      this.initExpenditureType()
      this.initBillType()
      this.initBillCloseType()
    },
    initSelectedDate: function () {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      this.setData({
        selectedDate: year + "-" + month + "-" + day,
      })
    },
    initExpenditureType: function () {
      database.collection('expenditureType').get().then(res => {
        console.log(res)
        this.setData({
          expenditureTypes: res.data
        })
      })
    },
    initBillType: function () {
      database.collection('billType').get().then(res => {
        this.setData({
          billTypes: res.data
        })
      })
    },
    initBillCloseType: function () {
      database.collection('billCloseType').get().then(res => (
        this.setData({
          billCloseTypes: res.data
        })
      ))
    }
  }
})
