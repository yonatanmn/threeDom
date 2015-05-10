
/* Data Sets -------------------------------------------------- */

//function

function XY( x, y ) {
  if (Array.isArray(arguments[0]) && arguments[0].length === 2){
    this.x = arguments[0][0];
    this.y = arguments[0][1];
  } else {
    this.x = x || 0;
    this.y = y || 0;
  }
}

function XYZ( x, y, z ) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

function Dimension2d(w,h) {
  this.w = w || 100;
  this.h = h || 100;
}

function Dimension3d(w,h,d) {
  this.w = w || 100;
  this.h = h || 100;
  this.d = d || 100;
}
