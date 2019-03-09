// miniprogram/pages/output/output.js
const config = require("../../config.js")
const database = config.database

Page({
  /**
   * 页面的初始数据
   */
  data: {
    closeOutputTypes: [
      { name: '日结', value: '日结' },
      { name: '周结', value: '周结' },
      { name: '月结', value: '月结' },
      { name: '年结', value: '年结' },
      { name: '其他', value: '其他' }
    ],
    closeOutputs: [
      { name: '已结', value: '已结', checked: 'true' },
      { name: '未结', value: '未结' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    this.setData({
      date: year + "-" + month + "-" + day,
      closeOutputTypeIndex: 0,
      closeOutputType: this.data.closeOutputTypes[0].value,
      outputMoney: 0,
      closeOutput: this.data.closeOutputs[0].value
    })
    this.getOutputType()
  },
  dateChange: function (event) {
    this.setData({
      date: event.detail.value
    })
  },
  outputTypeChange: function (event) {
    this.setData({
      outputTypeIndex: event.detail.value,
      outputType: this.data.outputTypes[event.detail.value]._id,
    })
  },
  getOutputType: function () {
    database.collection('outputType').get().then(res => {
      this.setData({
        outputTypeIndex: 0,
        outputTypes: res.data,
        outputType: res.data[0]._id,
      })
    })
  },
  addOutputType: function (event) {
    this.setData({
      newOutputType: event.detail.value
    })
  },
  saveOutputType: function () {
    if (this.data.newOutputType == '' || this.data.newOutputType == null) {
      return
    }
    database.collection('outputType').add({
      data: {
        showContent: this.data.newOutputType,
        createdAt: database.serverDate()
      }
    }).then(res => {
      this.setData({
        showModal: false,
        newOutputType: ''
      })
      this.getOutputType()
    })
  },
  closeOutputTypeChange: function (event) {
    this.setData({
      closeOutputTypeIndex: event.detail.value,
      closeOutputType: this.data.closeOutputTypes[event.detail.value].value,
    })
  },
  outputMoneyChange: function (event) {
    this.setData({
      outputMoney: event.detail.value,
    })
  },
  closeOutputChange: function (event) {
    this.setData({
      closeOutput: event.detail.value,
    })
  },
  submit: function () {
    database.collection('output').add({
      data: {
        outputDate: this.data.date,
        outputType: this.data.outputType,
        outputMoney: this.data.outputMoney,
        closeOutputType: this.data.closeOutputType,
        closeOutput: this.data.closeOutput,
        createdAt: database.serverDate()
      }
    }).then(res => {
      wx.redirectTo({
        url: config.pages.index,
      })
    })
  },
  showModal: function () {
    this.setData({
      showModal: true
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    })
  }
})