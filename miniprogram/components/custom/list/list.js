Component({
  properties: {
    collectionName: {
      type: String,
      value: '',
      observer: function(newValue) {
        this.setData({
          collectionName: newValue
        })
        let url = ''
        let tip = ''
        if (newValue == 'revenueType') {
          url = 'revenueType-findAll'
          tip = '请选择事由'
        } else if (newValue == 'billType') {
          url = 'billType-findAll'
          tip = '请选择结账类型'
        } else if (newValue == 'billCloseType') {
          url = 'billCloseType-findAll'
          tip = '请选择是否结账'
        }
        this.setData({
          tip: tip
        })
        wx.cloud.callFunction({
          name: 'router',
          data: {
            $url: url,
          }
        }).then(res => {
          this.setData({
            items: res.result.data
          })
        }).catch(err => {
          wx.showToast({
            title: '系统开小差了~',
            icon: 'none'
          })
        })
      }
    },
    showAdd: {
      type: Boolean,
      value: false,
      observer: function(newValue) {
        this.setData({
          showAdd: newValue
        })
      }
    },
    showEdit: {
      type: Boolean,
      value: false,
      observer: function(newValue) {
        this.setData({
          showEdit: newValue
        })
      }
    },
    showDelete: {
      type: Boolean,
      value: false,
      observer: function(newValue) {
        this.setData({
          showDelete: newValue
        })
      }
    }
  },
  data: {

  },
  methods: {
    select: function(event) {
      this.triggerEvent('selecteditem', {
        collectionName: this.data.collectionName,
        selectedItem: event.target.dataset.item
      })
    },
    add: function(event) {
      this.setData({
        showAddDialog: true,
        addDialogTip: '添加事由'
      })
    },
    edit: function(event) {
      this.setData({
        showAddDialog: true,
        addDialogTip: '编辑事由',
        editContent: event.target.dataset.item.content,
        editId: event.target.dataset.item._id
      })
    },
    delete: function(event) {
      this.setData({
        deletedDialog: true,
        deletedItemId: event.target.dataset.id,
        deletedItemIndex: event.target.dataset.index
      })
    },
    confirmDeleteDialog: function() {
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
    cancelDeleteDialog: function() {
      this.setData({
        deletedDialog: false
      })
    },
    inputNewData: function(event) {
      this.setData({
        inputContent: event.detail.value
      })
    },
    confirmAddDialog: function() {
      if (this.data.editId) {
        wx.cloud.callFunction({
          name: 'router',
          data: {
            $url: 'revenueType-delete',
            _id: this.data.editId,
            content: this.data.inputContent
          }
        }).then(res => {
          console.log(res)
          this.setData({
            showAddDialog: false
          })
          wx.showToast({
            title: '保存成功~',
            icon: 'none'
          })
        }).catch(err => {
          wx.showToast({
            title: '保存失败~',
            icon: 'none'
          })
        })
      } else {
        wx.cloud.callFunction({
          name: 'router',
          data: {
            $url: 'revenueType-save',
            content: this.data.inputContent
          }
        }).then(res => {
          if (res.result && res.result._id) {
            this.setData({
              showAddDialog: false
            })
            wx.showToast({
              title: '保存成功~',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: '保存失败~',
              icon: 'none'
            })
          }
        }).catch(err => {
          wx.showToast({
            title: '保存失败~',
            icon: 'none'
          })
        })
      }
    },
    cancelAddDialog: function() {
      this.setData({
        showAddDialog: false
      })
    }
  }
})
