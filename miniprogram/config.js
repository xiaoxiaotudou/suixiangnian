const isProd = false
const config = {
  pages: {
    "index": "/pages/index/index",
    "share": "/pages/share/index",
    "publish": "/pages/publish/index",
    "message": "/pages/message/index",
    "profile": "/pages/profile/profile",
    "bill": "/pages/bill/bill",
    "advice": "/pages/advice/index",
    "helper": "/pages/helper/index"
  },
  env: isProd ? 'prod-29121c' : 'staging-ef4dd',
}

module.exports = config