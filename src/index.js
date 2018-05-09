import { isObject } from './utils.js'

let timeCounts = Object.create(null)

export default function TimeCount (name, cb) {
  if (!(this instanceof TimeCount)) {
    return new TimeCount(name)
  }
  if (timeCounts[name]) {
    return timeCounts[name]
  }
  this.name = name
  this.second = 0
  this.timeHandler = null
  timeCounts[name] = this
  this.cb = cb
}

TimeCount.getInstanceByName = function get (name) {
  return timeCounts[name]
}

TimeCount.removeInstance = function remove (symbol) {
  if (isObject(symbol)) {
    for (let key in timeCounts) {
      if (timeCounts[key] === symbol) {
        timeCounts[key] = null
        break
      }
    }
  } else {
    timeCounts[symbol] = null
  }
}

TimeCount.prototype.start = function start (context) {
  if (this.timeHandler) {
    clearTimeout(this.timeHandler)
    this.timeHandler = null
  }
  this.timeHandler = setTimeout(() => {
    this.second++
    this.cb.apply(context || null)
    this.start(context)
  }, 1000)
  return this
}

TimeCount.prototype.setTime = function setTime (num) {
  if (typeof num === 'number') {
    this.second = num
  }
  return this
}

TimeCount.prototype.reset = function reset () {
  this.setTime(0)
  clearTimeout(this.timeHandler)
  this.cb()
  this.start()
  return this
}

TimeCount.prototype.getSecond = function getSecond () {
  return this.second
}

TimeCount.prototype.stop = function stop () {
  clearTimeout(this.timeHandler)
  this.timeHandler = null
  return this
}
