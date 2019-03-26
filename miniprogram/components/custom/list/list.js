Component({
  properties: {
    collectionName: {
      type: String,
      value: '',
      observer: function(newValue) {
        const index = newValue.indexOf('_')
        if (index == -1) {
          this.setData({
            collectionName: newValue
          })
        } else {
          this.setData({
            collectionName: newValue.substr(0, index),
            type: newValue.substr(index + 1, newValue.length)
          })
        }
        this.findAll(this.data.collectionName)
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
    showLoading: true
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
        deletedItemId: event.target.dataset.id
      })
    },
    confirmDeleteDialog: function() {
      wx.cloud.callFunction({
        name: 'router',
        data: {
          $url: 'billReason-delete',
          _id: this.data.deletedItemId
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
          this.findAll(this.data.collectionName)
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
            $url: 'billReason-delete',
            _id: this.data.editId,
            type: this.data.type,
            content: this.data.inputContent
          }
        }).then(res => {
          this.setData({
            showAddDialog: false,
            editContent: '',
            editId: ''
          })
          this.findAll(this.data.collectionName)
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
            $url: 'billReason-save',
            content: this.data.inputContent,
            type: this.data.type
          }
        }).then(res => {
          if (res.result && res.result._id) {
            this.setData({
              showAddDialog: false
            })
            this.findAll(this.data.collectionName)
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
      if (this.data.editContent || this.data.editId) {
        this.setData({
          editContent: '',
          editId: ''
        })
      }
    },
    findAll: function(collectionName) {
      let url = ''
      let tip = ''
      if (collectionName == 'billReason') {
        url = 'billReason-findAll'
        tip = '请选择事由'
      } else if (collectionName == 'billType') {
        url = 'billType-findAll'
        tip = '请选择结账类型'
      } else if (collectionName == 'billCloseType') {
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
          type: this.data.type
        }
      }).then(res => {
        if (res.result.data == 0) {
          this.setData({
            items: res.result.data,
            showLoading: true,
            emptyItems: true
          })
        } else {
          this.setData({
            items: res.result.data,
            showLoading: false
          })
        }
      }).catch(err => {
        console.log(err)
        wx.showToast({
          title: '系统开小差了~',
          icon: 'none'
        })
      })
    }
  }
})
