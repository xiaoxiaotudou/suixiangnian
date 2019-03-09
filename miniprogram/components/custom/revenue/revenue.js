Component({
  properties: {

  },
  data: {

  },
  lifetimes: {
    attached() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      this.setData({
        selectedDate: year + "-" + month + "-" + day,
      })
    }
  },
  methods: {
    dateChange: function (event) {
      this.setData({
        selectedDate: event.detail.value
      })
    },
  }
})
