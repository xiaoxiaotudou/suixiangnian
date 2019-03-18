const isProd = false
const config = {
  pages: {
    "index": "/pages/index/index",
    "share": "/pages/share/share",
    "publish": "/pages/publish/publish",
    "message": "/pages/message/message",
    "profile": "/pages/profile/profile",
    "input": "/pages/input/input",
    "output": "/pages/output/output",
    "search": "/pages/search/search",
    "bill": "/pages/bill/bill"
  },
  env: isProd ? 'prod-29121c' : 'staging-ef4dd',
}

module.exports = config