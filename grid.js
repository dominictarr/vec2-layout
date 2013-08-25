/**
 * Grid (a.k.a fair)
 *
 *  +----------+----------+ +----------+----------+
 *  |          |          | |          |          |
 *  |          |          | |          |          |
 *  |          |          | |          |          |
 *  |          |          | +----------+----------+
 *  |          |          | |                     |
 *  |          |          | |                     |
 *  |          |          | |                     |
 *  +---------------------+ +---------------------+
 *        2 windows               3 windows
 *
 *  +----------+----------+ +------+-------+------+
 *  |          |          | |      |       |      |
 *  |          |          | |      |       |      |
 *  |          |          | |      |       |      |
 *  +----------+----------+ +------+---+---+------+
 *  |          |          | |          |          |
 *  |          |          | |          |          |
 *  |          |          | |          |          |
 *  +---------------------+ +---------------------+
 *        4 windows               5 windows
 */

module.exports = function (elements, screen, _) {
  var windows = elements;
  var length = elements.length
  if(!length) return

  var rows, cols;
  for(cols = 0; cols <= length/2; cols++) {
    if(cols * cols >= length) {
      break;
    }
  }
  rows = ((cols && (cols -1) * cols >= length) ? cols - 1 : cols);

  // cells
  var cellHeight = screen.size.y / (rows ? rows : 1);
  var cellWidth = screen.size.x / (cols ? cols : 1);

  elements.forEach(function(rec, index) {
    if(rows > 1 && index == (rows*cols) - cols
       && (length - index) <= ( length)
      ) {
      cellWidth = screen.size.x / (length - index);
    }

    var newX = screen.x + ~~(index % cols) * cellWidth;
    var newY = screen.y + ~~(index / cols) * cellHeight;
    rec.set(Math.floor(newX), Math.floor(newY));

    // adjust height/width of last row/col's windows
    var adjustHeight = ( (index >= cols * (rows -1) ) ?  screen.size.y - cellHeight * rows : 0 );
    var adjustWidth = 0;
    if(rows > 1 && index == length-1 && (length - index) < (length % cols) ) {
      adjustWidth = screen.width - cellWidth * (length % cols);
    } else {
      adjustWidth = ( ((index + 1) % cols == 0 ) ? screen.size.x - cellWidth * cols : 0 );
    }

    rec.size.set(~~(cellWidth+adjustWidth), ~~(cellHeight+adjustHeight) );
  });
  return elements
}
