

//function Face(parent, color, w,h,x,y,z,rx,ry,rz) {
/**
 * Face is any object contains does props, not necessarily part of the DOM
 * @param dimensions - Dimension2d
 * @param position - Triplet
 * @param rotation - Triplet
 * @constructor
 */
function Face(dimensions,position,rotation) {
  this.width = dimensions.w;
  this.height = dimensions.h;
  this.position = position;
  this.rotation = rotation;
}
/**
 * insert instance of Face to the DOM
 * @param parent - the instace will be DOM child of @parent
 * @param className
 */
Face.prototype.insert = function(parent,className){
  this.node = HtmlUtils.createElem(parent.node,null,className);
  CssUtils.inject(this.node,
    CssUtils.base(),
    CssUtils.size(this.width,this.height),
    CssUtils.transform(this.position.x,this.position.y,this.position.z,this.rotation.x,this.rotation.y,this.rotation.z)
  );
};

/**
 * inherits from Face, and automatically inserts a square to dom
 * @param parent
 * @param color - unique to Square
 * @param dimensions
 * @param position
 * @param rotation
 * @constructor
 */
function Square(parent, dimensions, position, rotation, color){
  Face.call(this,dimensions,position,rotation);

  this.color = color;
  Face.prototype.insert.call(this,parent,'square');
  CssUtils.inject(this.node,
    CssUtils.bgColor(this.color)
  );
}
Square.prototype = Object.create(Face.prototype);
Square.prototype.constructor = Square;

/**
 * Shape is made of three div, one positioned, one cuts it with relevant rotation,
 * and the third fills the cut with mirror-rotated background
 * @param parent
 * @param dimensions
 * @param position
 * @param rotation
 * @param cutterPosition
 * @param cutterRotation
 * @constructor
 */
function Shape(parent,dimensions,position,rotation,cutterPosition,cutterRotation){
  Face.call(this,dimensions,position,rotation);
  //this.parent = parent;
  Face.prototype.insert.call(this,parent,'shape');

  var cutter_top = cutterPosition.top;
  var cutter_left = cutterPosition.left;

  var rotTrigo = GeneralUtils.getTrigo(cutterRotation);

  var filler_left  =  -cutter_left * rotTrigo.cos -cutter_top * rotTrigo.sin;
  var filler_top =  cutter_left * rotTrigo.sin -cutter_top * rotTrigo.cos;

  this.cutter = HtmlUtils.createElem(this.node,null,'cutter');
  CssUtils.inject(this.cutter,
    CssUtils.absolutePosition(cutter_top,cutter_left),
    CssUtils.transform(0,0,0,0,0,cutterRotation)
  );

  this.filler = HtmlUtils.createElem(this.cutter,null,'filler');
  CssUtils.inject(this.filler,
    CssUtils.absolutePosition(filler_top,filler_left),
    CssUtils.transform(0,0,0,0,0,-cutterRotation)
  );

  //set the center of this DOM element in the center of the post-cut shape
  //this formula is not accurate!!
  CssUtils.inject( this.node,
    CssUtils.origin((cutter_top+100)/2,(cutter_left+100)/2,0)
  );


}

//EquilateralTriangle
/**
 * two instances of Shapes that are 30-60-90 triangle, one next to each other,
 * in order to create one 60-60-60 triangle
 * @param parent
 * @param dimensions
 * @param position
 * @param rotation
 * @constructor
 */
function EqTri(parent, dimensions, position, rotation){
  this.node = HtmlUtils.createElem(parent.node,null,'eqTri');
  this.width = dimensions.w;
  this.height = dimensions.h;
  this.position = position;
  this.rotation = rotation;

  var deg = 30;

  //var top = Math.sqrt(2*Math.pow(this.width,2));

  var left = new Shape(parent,dimensions,position,rotation,{top:31.8,left:68.0},deg);
  //sould be filler - top: 7%; left: -74%

  var right = new Shape(parent,dimensions,position,rotation,{top:31.8,left:-68.0},-deg);
//l(CssUtils.origin('bottom ', 'left',' '))
  CssUtils.inject(left.cutter,
    CssUtils.absolutePosition(0,0),
    CssUtils.origin(0,100,0 )
  );
  CssUtils.inject(left.filler,
    CssUtils.bgPosition(-150)
  );
  CssUtils.inject(right.cutter,
    CssUtils.absolutePosition(0,0),
    CssUtils.origin('bottom', 'right','')
  );
  CssUtils.inject(right.filler,
    CssUtils.bgPosition(150)
  );
  //HtmlUtils.createElem(this.node,null,'cutter');
}

