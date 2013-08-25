
module.exports = 
function tile(elements, screen, scale) {
  // the way DWM does it is to reserve half the screen for the first screen,
  // then split the other half among the rest of the screens
  scale = scale || 0.5

  //hmm, get the scale from a data attribute on the screen?
  //maybe that would be better?

  if(elements.length < 1) {
    return elements
  }
  var mainId = 0;
  if(elements.length == 1) {
    elements[0].set(screen.x, screen.y);
    elements[0].size.set(screen.size.x, screen.size.y);
  } else {
    // when main scale = 0.5, the divisor is 2
    var halfWidth = Math.floor(screen.size.x * scale);

    elements[0].set(screen.x, screen.y);
    elements[0].size.set(halfWidth, screen.size.y);

    // remove from visible
    var remaining = elements.length - 1
    var remainWidth = screen.size.x - halfWidth;
    var sliceHeight = Math.floor(screen.size.y / remaining);
    for(var i = 0; i < remaining; i++) {
      elements[i + 1].set(screen.x + halfWidth, ~~(screen.y + i*sliceHeight));
      elements[i + 1].size.set(remainWidth, sliceHeight);
    }
  }
  return elements
};

