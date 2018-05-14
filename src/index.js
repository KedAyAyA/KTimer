import { isObject, cloneOptionsData } from './utils.js'
import { defaultChangeDataFn } from './default.js'

let KTimers = Object.create(null)

/**
 * 
 * @param {string} name 
 * @param {obj} options 
 */
export default function KTimer (name, options) {
  if (typeof name !== 'string') {
    throw new Error('name must be a string')
  }
  
  if (!(this instanceof KTimer)) {
    return new KTimer(name)
  }

  if (KTimers[name]) {
    return KTimers[name]
  }

  this.options = options || {}

  this.name = name
  this.data = cloneOptionsData(this.options.data)
  this.cb = this.options.callback || function () {}
  this.delay = this.options.delay || 1000
  this.changeDataFn = (this.options.changeDataFn || defaultChangeDataFn).bind(this)
  
  this.timeHandler = null
  KTimers[name] = this
}

/**
 * 
 * @param {str} name 
 * @description
 * static method
 */
KTimer.getInstanceByName = function get (name) {
  return KTimers[name]
}

/**
 * 
 * @param {String|Object} symbol 
 * @description 
 * static method
 * remove KTimer in KTimers by symbol
 * symbol with string refer to name
 * symbol with object refer to instance
 */
KTimer.removeInstance = function remove (symbol) {
  if (isObject(symbol)) {
    for (let key in KTimers) {
      if (KTimers[key] === symbol) {
        KTimers[key] = null
        break
      }
    }
  } else {
    KTimers[symbol] = null
  }
}

/**
 * 
 * @param {anything} context
 * @description
 * optional callback's context. In some cases will be usable
 *  
 */
KTimer.prototype.start = function start (context) {
  if (this.timeHandler) {
    clearTimeout(this.timeHandler)
    this.timeHandler = null
  }
  this.timeHandler = setTimeout(() => {
    let temp = this.changeDataFn.call(null, this.data)
    if (!isObject(this.data)) {
      this.data = temp === undefined ? this.data : temp
    }

    this.start(context)
    this.cb.apply(context || null)
  }, this.delay)
  return this
}

/**
 * 
 * @param {anything} data 
 * @description
 * set instance data
 */
KTimer.prototype.setData = function setData (data) {
  this.data = data
  return this
}

KTimer.prototype.reset = function reset (context) {
  this.setData(cloneOptionsData(this.options.data))
  clearTimeout(this.timeHandler)
  this.cb.apply(context || null)
  return this
}

KTimer.prototype.getData = function getdata () {
  return this.data
}

/**
 * @description
 * stop the KTimer
 */
KTimer.prototype.stop = function stop () {
  clearTimeout(this.timeHandler)
  this.timeHandler = null
  return this
}
