const { getRandomStr } = require('../index.js')

describe('index', function () {
  it('getRandomStr Return different values twice', function () {
    const a = getRandomStr()
    const b = getRandomStr()
    expect(a).not.toBe(b)
  })
})