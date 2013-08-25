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
    '.fruit :hover { border: red 1px solid }',
    '.fruit { display: block }'
  )
)

var main

document.body.appendChild(
  main = h('div',
    fruit('Apple',      'red'),
    fruit('Banana',     'yellow'),
    fruit('Cherry',     'magenta'),
    fruit('Durian',     'green'),
    fruit('Elderberry', 'blue')
  )
)

layout(main)

var vdom = require('vec2-dom')

var screen = vdom.screenSize()
main.rec.size.set(screen)

screen.change(function () {
  main.rec.size.set(screen)
})

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
    h('button', 'rotate', {
      href: '#', onclick: function () {
        main.appendChild(main.firstChild)
      }
    }),
    h('button', 'toggle',{
      href: '#', onclick: function () {
        main.layout((toggle = !toggle) ? layout.tile : layout.grid) 
      }
    })
  )
)
