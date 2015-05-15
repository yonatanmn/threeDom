
/* Textures -------------------------------------------------- */
var TEXTURES = {
  STONE: '../images/stone.png'
};

/* Viewport -------------------------------------------------- */

function Viewport() {
  this.perspective = 1700; //px
  this.node = HtmlUtils.createElem('body','viewport2')
  CssUtils.inject(
    this.node,
    'position: relative; overflow: hidden; width: 100%; height: 100%; background: #000;',
    CssUtils.perspective(this.perspective)
  );
}

/* Camera -------------------------------------------------- */

function Camera(vp) {
  this.node = HtmlUtils.createElem(vp.node, 'camera2');
  this.rotation = new XYZ();
  this.perspective = vp.perspective;
  CssUtils.inject( this.node, CssUtils.base() );
}

Camera.prototype = {
  updateRotation: function (rot) {
    this.rotation = rot || this.rotation;
    CssUtils.inject(this.node, CssUtils.transform(0,0,this.perspective,this.rotation.x,this.rotation.y,0) );
  }
};

/* World -------------------------------------------------- */

function World(cameraNode) {
  this.node = HtmlUtils.createElem(cameraNode, 'world2');
  this.position = new XYZ();
  CssUtils.inject( this.node, CssUtils.base() );
}

World.prototype = {
  constructor:World,

  updatePosition: function (pos) {
    this.position = pos;
    CssUtils.inject(this.node, CssUtils.transform(pos.x,pos.y,pos.z,0,0,0) );
  }//,
  //createRoom: function (position,dimensions,id) {
  //  new Room(this.node,position,dimensions,id)
  //}
};

/* Room -------------------------------------------------- */

function Room(worldNode,position,dimensions,id) {
  this.node = HtmlUtils.createElem(worldNode, id ,'room');
  this.position = position || new XYZ();
  this.dim = dimensions || new Dimension3d();
  CssUtils.inject(
    this.node,
    CssUtils.base(),
    CssUtils.transform(this.position.x,this.position.y,this.position.z,0,0,0)
  );

  this.left = new Square(this,
    new Dimension2d(this.dim.d, this.dim.h),
    new XYZ(-this.dim.w / 2, 0, 0),
    new XYZ(0, 90, 0),
    'yellow');
  this.right = new Square(this,
    new Dimension2d(this.dim.d, this.dim.h),
    new XYZ(this.dim.w / 2, 0, 0),
    new XYZ(0, -90, 0),
    'blue');
  this.front = new Square(this,
    new Dimension2d(this.dim.w, this.dim.h),
    new XYZ(0, 0, -this.dim.d / 2),
    new XYZ(0, 0, 0),
    'brown');
  this.rear = new Square(this,
    new Dimension2d(this.dim.w, this.dim.h),
    new XYZ(0, 0, this.dim.d / 2),
    new XYZ(180, 0, 0),
    'pink');
  this.ceiling = new Square(this,
    new Dimension2d(this.dim.w, this.dim.d),
    new XYZ(0, -this.dim.h / 2, 0),
    new XYZ(-90, 0, 0),
    'purple');
  this.floor = new Square(this,
    new Dimension2d(this.dim.w, this.dim.d),
    new XYZ(0, this.dim.h / 2, 0),
    new XYZ(90, 0, 0),
    'green');


  var test = new EqTri(this.front,
    new Dimension2d(100, 100),
    new XYZ(50, 50, 0),
    new XYZ(0, 0, 0)
  );


}

/*World.prototype = {
  updatePosition: function (pos) {
    this.position = pos;
    CssUtils.inject(this.node, CssUtils.transform(pos.x,pos.y,pos.z,0,0,0) );
  }
};*/



/* Plane -------------------------------------------------- */


/*-----------------------*/
window.onload = function() {
//$(document).ready(function () {

  var zeroTriplet = new XYZ();
  var vp = new Viewport();
  var cam = new Camera(vp);
  cam.updateRotation(new XYZ());
  var world = new World(cam.node);
  world.updatePosition(new XYZ(-100,0,-1240));

  var roomHeight = 2000;
  var room1 = new Room(world.node, new XYZ(),new Dimension3d(4000,roomHeight,3500),'first-room');

  var letterHeight = 400;
  var letterDepth = 100;
  var y1 =
    new ClippedElement(room1,
      new Dimension3d(letterHeight,letterHeight,letterDepth),
      new XYZ(300,/*roomHeight/2 - letterHeight/2*/200,50),
      new XYZ(0,0,0),
      LetterCoordinates.D,
      TEXTURES.STONE
    );
  var c1 =
    new ClippedElement(room1,
      new Dimension3d(letterHeight,letterHeight,letterDepth),
      new XYZ(-100,/*roomHeight/2 - letterHeight/2*/200,50),
      new XYZ(0,0,0),
      LetterCoordinates.C,
      TEXTURES.STONE
    );
  var o1 =
    new ClippedElement(room1,
      new Dimension3d(letterHeight,letterHeight,letterDepth),
      new XYZ(-300,/*roomHeight/2 - letterHeight/2*/200,50),
      new XYZ(0,0,0),
      LetterCoordinates.O,
      TEXTURES.STONE
    );

  function move(direction) {
    console.log('move ' + direction)
    var speed = 6;

    var pos = world.position;
    var rot = cam.rotation;

    var dir_angles;
    switch (direction) {
      case 'forward':
        dir_angles = 0;
        break;
      case 'backward':
        dir_angles = 180;
        break;
      case 'right':
        dir_angles = 90;
        break;
      case 'left':
        dir_angles = 270;
        break;
    }

    var rotTrigo = GeneralUtils.getTrigo(rot.y + dir_angles);

    pos.x -= speed * rotTrigo.sin;
    pos.z += speed * rotTrigo.cos;

    world.updatePosition(pos);

  }

  function look(direction) {
    console.log('look ' + direction)
    var rot = cam.rotation;

    switch (direction) {
      case 'up':
        rot.x++;
        break;
      case 'down':
        rot.x--;
        break;
      case 'right':
        rot.y++;
        break;
      case 'left':
        rot.y--;
        break;
    }
    cam.updateRotation(rot)

  }

    document.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case 38:
        move('forward');
        break;
      case 39:
        move('right');
        break;
      case 40:
        move('backward');
        break;
      case 37:
        move('left');
        break;
      case 87:
        look('up');
        break;
      case 68:
        look('right');
        break;
      case 83:
        look('down');
        break;
      case 65:
        look('left');
        break;
    }


  })


};
