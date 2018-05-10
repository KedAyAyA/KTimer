import KTimer from '../src/index.js'
const should = require('chai').should()

describe('KTimer test', () => {

  describe('KTimer static method', () => {

    it('getInstanceByName return the name instance', () => {
      let test2timer = new KTimer('test2timer')
      let getTest2 = KTimer.getInstanceByName('test2timer')
      ;(test2timer === getTest2).should.equal(true)
    })
    
    it('removeInstance delete instance when symbol is string', () => {
      KTimer.removeInstance('test2timer')
      let getTest2 = KTimer.getInstanceByName('test2timer')
      ;(getTest2 === null).should.equal(true)
    })
    
    it('removeInstance delete instance when symbol is instance', () => {
      let test2timer = new KTimer('test2timer')
      let getTest2 = KTimer.getInstanceByName('test2timer')
      ;(test2timer === getTest2).should.equal(true)
      KTimer.removeInstance(test2timer)
      getTest2 = KTimer.getInstanceByName('test2timer')
      ;(getTest2 === null).should.equal(true)
    })
    
  })

  describe('Create a KTimer & instance method', () => {
    let test1timer = new KTimer('test1timer', {
      delay: 2000,
      callback: function () {
        let temp = test1timer.getData()
        test1timer.setData(temp + 1)
      },
      data: 1
    })

    it('new with same name return the same instance', () => {
      let test1 = new KTimer('test')
      let test2 = new KTimer('test')

      ;(test1 === test2).should.equal(true)
    })

    it('setData & getData', () => {
      let data1 = test1timer.getData()
      data1.should.equal(1)

      test1timer.setData(5)
      data1 = test1timer.getData()
      data1.should.equal(5)
    })
  })

  describe('use case', () => {
    it('stop timer', (done) => {
      let test3timer = new KTimer('test3timer', {
        delay: 200,
        callback: function () {
          let temp = test3timer.getData()
          test3timer.setData(temp + 1)
          if (test3timer.getData() > 5) {
            test3timer.stop()
            done()
          }
        },
        data: 1
      }).start()
    })
  })
})