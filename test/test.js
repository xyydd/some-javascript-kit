var assert = require('assert')
const { getRandomStr } = require('../index.js')

describe('index', function () {
  describe('getRandomStr function', function () {
    it('Return different values twice', function () {
      const a = getRandomStr()
      const b = getRandomStr()
      assert.notEqual(a, b)
    })
  })
})