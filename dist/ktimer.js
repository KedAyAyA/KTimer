(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.KTimer = factory());
}(this, (function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
  }

  function isPrimitive(data) {
    return typeof data === 'number' || typeof data === 'string' || typeof data === 'boolean';
  }

  function cloneOptionsData(data) {
    if (isObject(data)) {
      return JSON.parse(JSON.stringify(data));
    }

    if (isPrimitive(data)) {
      return data;
    }

    return 0;
  }

  function defaultChangeDataFn(data) {
    return data;
  }

  var KTimers = Object.create(null);

  /**
   * 
   * @param {string} name 
   * @param {obj} options 
   */
  function KTimer(name, options) {
    if (typeof name !== 'string') {
      throw new Error('name must be a string');
    }

    if (!(this instanceof KTimer)) {
      return new KTimer(name);
    }

    if (KTimers[name]) {
      return KTimers[name];
    }

    this.options = options || {};

    this.name = name;
    this.data = cloneOptionsData(this.options.data);
    this.cb = this.options.callback || function () {};
    this.delay = this.options.delay || 1000;
    this.changeDataFn = (this.options.changeDataFn || defaultChangeDataFn).bind(this);

    this.timeHandler = null;
    KTimers[name] = this;
  }

  /**
   * 
   * @param {str} name 
   * @description
   * static method
   */
  KTimer.getInstanceByName = function get(name) {
    return KTimers[name];
  };

  /**
   * 
   * @param {String|Object} symbol 
   * @description 
   * static method
   * remove KTimer in KTimers by symbol
   * symbol with string refer to name
   * symbol with object refer to instance
   */
  KTimer.removeInstance = function remove(symbol) {
    if (isObject(symbol)) {
      for (var key in KTimers) {
        if (KTimers[key] === symbol) {
          KTimers[key] = null;
          break;
        }
      }
    } else {
      KTimers[symbol] = null;
    }
  };

  /**
   * 
   * @param {anything} context
   * @description
   * optional callback's context. In some cases will be usable
   *  
   */
  KTimer.prototype.start = function start(context) {
    var _this = this;

    if (this.timeHandler) {
      clearTimeout(this.timeHandler);
      this.timeHandler = null;
    }
    this.timeHandler = setTimeout(function () {
      var temp = _this.changeDataFn.call(null, _this.data);
      if (!isObject(_this.data)) {
        _this.data = temp;
      }

      _this.start(context);
      _this.cb.apply(context || null);
    }, this.delay);
    return this;
  };

  /**
   * 
   * @param {anything} data 
   * @description
   * set instance data
   */
  KTimer.prototype.setData = function setData(data) {
    this.data = data;
    return this;
  };

  KTimer.prototype.reset = function reset(context) {
    this.setData(cloneOptionsData(this.options.data));
    clearTimeout(this.timeHandler);
    this.cb.apply(context || null);
    return this;
  };

  KTimer.prototype.getData = function getdata() {
    return this.data;
  };

  /**
   * @description
   * stop the KTimer
   */
  KTimer.prototype.stop = function stop() {
    clearTimeout(this.timeHandler);
    this.timeHandler = null;
    return this;
  };

  return KTimer;

})));
