// miniprogram/pages/input/input.js
const config = require("../../config.js")
const database = config.database

Page({
  /**
   * 页面的初始数据
   */
  data: {
    closeInputTypes: [
      { name: '日结', value: '日结' },
      { name: '周结', value: '周结' },
      { name: '月结', value: '月结' },
      { name: '年结', value: '年结' },
      { name: '其他', value: '其他' }
    ],
    closeInputs: [
      { name: '已结', value: '已结', checked: 'true' },
      { name: '未结', value: '未结'}
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
      closeInputTypeIndex: 0,
      closeInputType: this.data.closeInputTypes[0].value,
      inputMoney: 0,
      closeInput: this.data.closeInputs[0].value
    })
    this.getInputType()
  },
  dateChange: function(event) {
    this.setData({
      date: event.detail.value
    })
  },
  inputTypeChange: function(event) {
    this.setData({
      inputTypeIndex: event.detail.value,
      inputType: this.data.inputTypes[event.detail.value]._id,
    })
  },
  getInputType: function() {
    database.collection('inputType').get().then(res => {
      this.setData({
        inputTypeIndex: 0,
        inputTypes: res.data,
        inputType: res.data[0]._id,
      })
    })
  },
  addInputType: function(event) {
    this.setData({
      newInputType: event.detail.value
    })
  },
  saveInputType: function() {
    if (this.data.newInputType == '' || this.data.newInputType == null) {
      return
    }
    database.collection('inputType').add({
      data: {
        showContent: this.data.newInputType,
        createdAt: database.serverDate()
      }
    }).then(res => {
      this.setData({
        showModal: false,
        newInputType: ''
      })
      this.getInputType()
    })
  },
  closeInputTypeChange: function(event) {
    this.setData({
      closeInputTypeIndex: event.detail.value,
      closeInputType: this.data.closeInputTypes[event.detail.value].value,
    })
  },
  inputMoneyChange: function(event) {
    this.setData({
      inputMoney: event.detail.value
    })
  },
  closeInputChange: function(event) {
    this.setData({
      closeInput: event.detail.value
    })
  },
  submit: function() {
    database.collection('input').add({
      data: {
        inputDate: this.data.date,
        inputType: this.data.inputType,
        inputMoney: this.data.inputMoney,
        closeInputType: this.data.closeInputType,
        closeInput: this.data.closeInput,
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
  hideModal: function() {
    this.setData({
      showModal: false
    })
  }
})