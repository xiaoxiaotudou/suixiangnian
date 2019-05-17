import regions from '../../utils/region.js';
import indexs from '../../utils/index.js';

Page({
  data: {
    prefix: "A",
    citys: []
  },
  onLoad: function(options) {
    let locations = [];
    let datas = [];
    indexs.forEach(index => {
      locations.push({
        prefix: index,
        datas: []
      });
    });
    regions.forEach(region => {
      const index = indexs.indexOf(region.prefix.toUpperCase());
      locations[index].datas.push(region);
    });
    locations.forEach(location => {
      if (location.datas.length !== 0) {
        datas.push(location);
      }
    })
    this.setData({ locations: datas });
  },
  tapLocation: function(e) {
    const province = e.currentTarget.dataset.province;
    const citys = e.currentTarget.dataset.citys;
    wx.navigateTo({
      url: `../city/index?citys=${encodeURIComponent(JSON.stringify(citys))}&province=${encodeURIComponent(province)}`,
    })
  },
  tapIndex: function(e) {
    this.setData({
      prefix: e.currentTarget.dataset.index
    });
  }
})