const should = require('chai').should()
import * as utils from '../src/utils.js'

describe('Utils', () => {
  describe('isObject', () => {
    it('1 should not a Object', () => {
      let test = utils.isObject(1)
      test.should.equal(false)
    })

    it('null should not a Object', () => {
      let test = utils.isObject(null)
      test.should.equal(false)
    })

    it('{} should be a Object', () => {
      let test = utils.isObject({})
      test.should.equal(true)
    })
  })

  describe('isPrimitive', () => {
    it('number should be primitive', () => {
      let test = utils.isPrimitive(1)
      test.should.equal(true)
    })

    it('string should be primitive', () => {
      let test = utils.isPrimitive('test')
      test.should.equal(true)
    })

    it('boolean should be primitive', () => {
      let test = utils.isPrimitive(true)
      test.should.equal(true)
    })

    it('null & undefined should not be primitive', () => {
      let test1 = utils.isPrimitive(undefined)
      test1.should.equal(false)
      let test2 = utils.isPrimitive(null)
      test2.should.equal(false)
    })

    it('object, function should not be primitive', () => {
      let test1 = utils.isPrimitive({})
      test1.should.equal(false)
      let test2 = utils.isPrimitive(function() {})
      test2.should.equal(false)
    })
  })

  describe('cloneOptionsData', () => {
    it('number, string, boolean will be same', () => {
      let number = utils.cloneOptionsData(1)
      let string = utils.cloneOptionsData('test')
      let boolean = utils.cloneOptionsData(false)
      number.should.equal(1)
      string.should.equal('test')
      boolean.should.equal(false)
    })

    it('obj will simply deep clone', () => {
      let obj = {a: 1, b: { c: 'lol' }}
      let copyobj = utils.cloneOptionsData(obj)
      obj.should.not.equal(copyobj)
      obj.a.should.equal(copyobj.a)
      obj.b.should.not.equal(copyobj.b)
    })

    it('null, undefined will be 0', () => {
      let test1 = utils.cloneOptionsData(null)
      let test2 = utils.cloneOptionsData(undefined)
      test1.should.equal(0)
      test2.should.equal(0)
    })
  })
})