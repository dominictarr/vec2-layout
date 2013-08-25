var Rec2 = require('rec2')

var tile = require('../tile')

var page = new Rec2(0, 0, 100, 100)

function rand() {
  return Math.random() * 100
}

var contents = [
  new Rec2(rand(),rand(),rand(),rand()),
  new Rec2(rand(),rand(),rand(),rand()),
  new Rec2(rand(),rand(),rand(),rand()),
  new Rec2(rand(),rand(),rand(),rand()),
  new Rec2(rand(),rand(),rand(),rand())
]

console.log(tile(contents, page))

var grid = require('../grid')

var contents = [
  new Rec2(rand(),rand(),rand(),rand()),
  new Rec2(rand(),rand(),rand(),rand()),
  new Rec2(rand(),rand(),rand(),rand()),
  new Rec2(rand(),rand(),rand(),rand()),
  new Rec2(rand(),rand(),rand(),rand())
]

console.log(grid(contents, page))

