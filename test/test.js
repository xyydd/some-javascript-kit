var assert = require('assert')
import { getRandomStr } from '../index.js'
describe('index', function () {
  describe('getRandomStr function', function () {
    it('Return different values ​​twice', function () {
      const a = getRandomStr()
      const b = getRandomStr()
      assert.notEqual(a, b)
    })
  })
})