var grid = require('./grid')
var vdom = require('vec2-dom')

var exports = module.exports = function (element, layout) {
  layout = layout || grid

  var root = element.rec = element.rec || vdom.absolute(element, true)

  function initChildren () {
    return [].map.call(element.children, function (e) {
      return e.rec = e.rec || vdom.absolute(e, true)
    })
  }
  var children = initChildren()
  function relayout (_layout) {
    if('function' === typeof _layout)
      layout = _layout
    if(children.length != element.children.length)
      children = initChildren()
    layout(children, root)
  }

  relayout.rotate = function () {
    children.push(children.shift())
    relayout()
  }

  var mo = new MutationObserver(relayout)
  mo.observe(element, {childList: true})
  element.rec.size.change(relayout)
  element.layout = relayout
  relayout()

  return element
}

exports.grid = grid
