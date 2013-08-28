var h = require('hyperscript')
var layout = require('../')

function fruit(name, colour) {
  return h('div.fruit', name, {
    style: {
      'background-color': colour
    }
  })
}

document.head.appendChild(
  h('style', 
    '* { margin: 0px; padding: 0px}',
    '* { font-family: Comic Sans MS; font-size: 20px }',
    '.fruit :hover { border: red 1px solid }',
    '.fruit { display: block; -webkit-transition: left 0.3s, width 0.3s, top 0.3s, height 0.3s; }'
  )
)

var main

document.body.appendChild(
  main = h('div',
    fruit('Apple',      'red'),
    fruit('Banana',     'yellow'),
    fruit('Cherry',     'magenta'),
    fruit('Durian',     'green'),
    fruit('Elderberry', 'blue'),
    fruit('Fig',        'lightgreen'),
    fruit('Grapefruit', 'orange'),
    fruit('horseradish', 'maroon')
  )
)

layout(main)

var vdom = require('vec2-dom')

var screen = vdom.screenSize()
main.rec.size.set(screen)

screen.change(function () {
  main.rec.size.set(screen)
})

var old = []

var toggle = true
document.body.appendChild(
  h('div', {
      style: {
        'background-color': 'white',
        position: 'fixed',
        right: '20px', top: '20px',
//        width: '20px', height: '20px'
      },
    },
    h('button', 'push', {
      href: '#', onclick: function () {
        if(old.length)
          main.appendChild(old.pop())
      }
    }),
    h('button', 'pop', {
      href: '#', onclick: function () {
        if(main.children.length)
          old.push(main.removeChild(main.lastChild))
      }
    }),
    h('button', 'rotate', {
      href: '#', onclick: function () {
         main.layout.rotate()
      }
    })
  )
)
