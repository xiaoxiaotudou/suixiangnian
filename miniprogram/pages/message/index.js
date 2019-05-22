const config = require("../../config.js")

Page({
  onLoad: function(options) {
    
  },
  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  }
})