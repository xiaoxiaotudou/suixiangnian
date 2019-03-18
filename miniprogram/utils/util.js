const throttle = (fn, gapTime) => {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1000
  }

  let lastTime = null
  return function () {
    const that = this
    let nowTime = new Date().getTime()
    if (nowTime - lastTime > gapTime || !lastTime) {
      fn(that)
      lastTime = nowTime
    }
  }
}

module.exports = { throttle }