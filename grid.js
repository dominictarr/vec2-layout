function cols (n) {
  return Math.ceil(Math.sqrt(n)) 
}

function rows(n) {
  var a = [], t = 0
  var c = cols(n)
  for(var i = 0; i < c; i++) {
    var r = Math.floor((n - t) / (c - i))
    a.push(r)
    t += r
  }
  return a
}

function layout(n, each) {
  var i = 0
  rows(n).forEach(function (r, c, a) {
    //column c, e rows in this col.
    for(var j = 0; j < r; j++)
      each(i++, j, c, r, a.length)
  })
}

module.exports = function (recs, screen, order) {
  layout(recs.length, function (i, j, c, r, C) {
    //i (cell in table)
    //j (cell in col)
    //c (col  in table)
    //r (rows in col)
    //C (total cols)
    var w = screen.size.x / C
    var h = screen.size.y / r
    //place odd columns in reverse order,
    //this counts the panes in a snaking shape
    //which feels more natural when they move,
    //because each pane moves less.

    //except for moving first to last.
    //I don't think this will be a problem,
    //because I'm only using rotate for testing.
    //in practice, you'll drag panes into position.

    //some numbers might make more sense to layout
    //clockwise
    var o = order && c % 2 ? r - j - 1 : j
    recs[i].set(w*c, h*o).size.set(w, h)
    //console.log('['+i+']', 'x:'+w*c, 'y:'+h*j)
  })
}
