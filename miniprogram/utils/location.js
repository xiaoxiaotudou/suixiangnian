const QQMapWX = require('../libs/qqmap-wx-jssdk.min.js')
const qqmapsdk = new QQMapWX({ key: 'DOWBZ-DFJWJ-TCIFD-KTQOE-MASNV-XUFDN' })

const getLocationName = () => {
  qqmapsdk.reverseGeocoder({
    success: function (res) {
      console.log(res)
    },
    fail: function (res) {
      console.log(res)
    }
  })
}

module.exports = { getLocationName }