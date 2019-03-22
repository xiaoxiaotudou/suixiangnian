Component({
  properties: {
    items: {
      type: Array,
      value: [],
      observer: function(newItems) {
        this.setData({
          items: newItems
        })
      }
    }
  },
  data: {

  },
  methods: {
    edit: function(event) {

    },
    delete: function(event) {
      this.setData({
        deletedDialog: true,
        deletedItemId: event.target.dataset.id,
        deletedItemIndex: event.target.dataset.index
      })
    },
    confirmDialog: function() {
      wx.cloud.callFunction({
        name: 'router',
        data: {
          $url: 'util',
          method: 'delete',
          collectionName: 'revenueType',
          params: {
            _id: this.data.deletedItemId
          }
        }
      }).then(res => {
        const result = res.result
        this.setData({
          deletedDialog: false
        })
        if (result.stats && result.stats.updated >= 1) {
          wx.showToast({
            title: '删除成功~',
            icon: 'none'
          })
          this.data.items.splice(this.data.deletedItemIndex, 1)
          this.setData({
            items: this.data.items
          })
        } else {
          wx.showToast({
            title: '删除失败~',
            icon: 'none'
          })
        }
      }).catch(err => {
        this.setData({
          deletedDialog: false
        })
        wx.showToast({
          title: '删除失败~',
          icon: 'none'
        })
      })
    },
    cancelDialog: function() {
      this.setData({
        deletedDialog: false
      })
    }
  }
})
