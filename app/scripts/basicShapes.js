

//function Face(parent, color, w,h,x,y,z,rx,ry,rz) {
/**
 * Face is any object contains does props, not necessarily part of the DOM
 * @param dimensions - Dimension2d
 * @param position - XYZ
 * @param rotation - XYZ
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
 * @param parent - the instance will be DOM child of @parent
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
 * holder element
 * the element has no size - relevant sizes will be given to child Faces
 * @param dimensions3D
 * @param position
 * @param rotation
 * @constructor
 */
function Element3D(dimensions3D,position,rotation){
  this.width = dimensions3D.w;
  this.height = dimensions3D.h;
  this.depth = dimensions3D.d;
  this.position = position;
  this.rotation = rotation;
}

/**
 * @param parent
 * @param className
 */
Element3D.prototype.insertHolder = function(parent,className){
  this.node = HtmlUtils.createElem(parent.node,null,className);
  CssUtils.inject(this.node,
    CssUtils.base(),
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
  //Face.call(this,dimensions,position,rotation);

  this.node = HtmlUtils.createElem(parent.node,null,'eqTri');
  this.width = dimensions.w;
  this.height = dimensions.h;
  this.position = position;
  this.rotation = rotation;

  var deg = 30;

  //var top = Math.sqrt(2*Math.pow(this.width,2));

  var left = new Shape(this,dimensions,position,rotation,{top:31.8,left:68.0},deg);
  //sould be filler - top: 7%; left: -74%

  var right = new Shape(this,dimensions,position,rotation,{top:31.8,left:-68.0},-deg);
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

/**
 * ClippedElement - front and rear use css's clip-path:polygon(coordinates),
 * texture is background-image - background-color not working with clip-path:polygon
 * shell is created according to same coordinates with normal Faces (not clipped)
 *
 * @param parent
 * @param dimensions
 * @param position
 * @param rotation
 * @param coordinates :: array of arrays[x(deg),y(deg)]
 * @param texture
 * @constructor
 */
function ClippedElement(parent,dimensions,position,rotation,coordinates,texture) {


  Element3D.call(this,dimensions,position,rotation);
  Element3D.prototype.insertHolder.call(this,parent,'letter_y');


  /**
   * insert faces,
   * add texture and backface:'hidden'
   * @param face
   */
  function insert(face) {
    face.insert(this,null);
    CssUtils.inject(face.node,
      //CssUtils.backface(true),
      CssUtils.bgImageCover(texture)
    );
  }

  this.texture = texture;

  this.front = new Face(
    new Dimension2d(this.width,this.height),
    new XYZ(0,0,this.depth/2),
    new XYZ()
  );

  this.rear = new Face(
    new Dimension2d(this.width,this.height),
    new XYZ(0,0,-this.depth/2),
    new XYZ(0, 180, 0)
  );

  //inser front and rear
  [this.rear,this.front].forEach(function (face) {
    insert.call(this,face);
    //add clip path to front and rear
    CssUtils.inject(face.node,
      CssUtils.clipPath(coordinates)
    );
  }.bind(this));

  //loop over coordinates, create Face to connect them
  //this becomes the shell
  this.shell = [];
  for(var i=0, startX=0, startY=0;
      i< coordinates.length;
      i++){

    //when i is in the last coordinate - next is the first one
    var next = coordinates[i+1]? i+1 : 0;
    var points = GeneralUtils.pointsDistance(new XY(coordinates[i]),new XY(coordinates[next]));

    var shellFaceWidth = this.width * points.dist /100;
    var positionX = -this.width/2 +  shellFaceWidth/2 + startX;
    var positionY = -this.width/2 +  startY;

    this.shell[i] = new Face(
      new Dimension2d(shellFaceWidth,this.depth),
      new XYZ(positionX,positionY,0),
      new XYZ(90,points.deg,0)
    );

    insert.call(this,this.shell[i]);
    //shell faces ;
    CssUtils.inject(this.shell[i].node,
      CssUtils.origin(0,50,0)
    );

    //update startX and startY for next irritation
    var tr = GeneralUtils.getTrigo(points.deg);
    startX += shellFaceWidth*tr.cos;
    startY += shellFaceWidth*tr.sin;
  }
}
