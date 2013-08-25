var tile = require('./tile')
var vdom = require('vec2-dom')

var exports = module.exports = function (element, layout) {
  layout = layout || tile

  var root = element.rec = element.rec || vdom.absolute(element, true)

  function relayout (_layout) {
    if('function' === typeof _layout)
      layout = _layout
    console.log('layout', layout)
    var children = [].map.call(element.children, function (e) {
      return e.rec = e.rec || vdom.absolute(e, true)
    })
    layout(children, root)
  }

  var mo = new MutationObserver(relayout)
  mo.observe(element, {childList: true})
  element.rec.size.change(relayout)
  element.layout = relayout
  relayout()

  return element
}

exports.tile = tile
exports.grid = require('./grid')
