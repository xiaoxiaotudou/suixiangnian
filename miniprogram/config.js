const isProd = false
const config = {
  pages: {
    "index": "/pages/index/index",
    "share": "/pages/share/share",
    "publish": "/pages/publish/index",
    "message": "/pages/message/index",
    "profile": "/pages/profile/profile",
    "bill": "/pages/bill/bill"
  },
  env: isProd ? 'prod-29121c' : 'staging-ef4dd',
}

module.exports = config