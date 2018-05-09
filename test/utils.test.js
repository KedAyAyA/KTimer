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
})