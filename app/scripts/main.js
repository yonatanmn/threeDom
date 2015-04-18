
/* Viewport -------------------------------------------------- */

function Viewport() {
  this.perspective = 700; //px
  this.node = HtmlUtils.createElem('body','viewport2')
  CssUtils.insert(
    this.node,
    'position: relative; overflow: hidden; width: 100%; height: 100%; background: #000;',
    CssUtils.perspective(this.perspective)
  );
}

/* Data Sets -------------------------------------------------- */

function Triplet( x, y, z ) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

function Dimension2d(w,h) {
  this.w = w || 100;
  this.h = h || 100;
}

function Dimension3d(w,h,l) {
  this.w = w || 100;
  this.h = h || 100;
  this.l = l || 100;
}

/* Camera -------------------------------------------------- */

function Camera(vp) {
  this.node = HtmlUtils.createElem(vp.node, 'camera2');
  this.rotation = new Triplet();
  this.perspective = vp.perspective;
  //console.log(CssUtils.base())

  CssUtils.insert( this.node, CssUtils.base() );
}

Camera.prototype = {
  updateRotation: function (rot) {
    this.rotation = rot || this.rotation;
    CssUtils.insert(this.node, CssUtils.transform(0,0,this.perspective,this.rotation.x,this.rotation.y,0) );
  }
};

/* World -------------------------------------------------- */

function World(cameraNode) {
  this.node = HtmlUtils.createElem(cameraNode, 'world2');
  this.position = new Triplet();
  CssUtils.insert( this.node, CssUtils.base() );
}

World.prototype = {
  updatePosition: function (pos) {
    this.position = pos;
    CssUtils.insert(this.node, CssUtils.transform(pos.x,pos.y,pos.z,0,0,0) );
  },
  createRoom: function (position,dimensions,id) {
    new Room(this.node,position,dimensions,id)
  }
};

/* Room -------------------------------------------------- */

function Room(worldNode,position,dimensions,id) {
  this.node = HtmlUtils.createElem(worldNode, id ,'room');
  this.position = position || new Triplet();
  this.dim = dimensions || new Dimension3d();
  CssUtils.insert(
    this.node,
    CssUtils.base(),
    CssUtils.transform(this.position.x,this.position.y,this.position.z,0,0,0)
  );

  this.left = new Face(this,
    'yellow',
    new Dimension2d(this.dim.l, this.dim.h),
    new Triplet(-this.dim.w/2,0,0),
    new Triplet(0,90,0)
  );


  this.right = new Face(this,
    'blue',
    new Dimension2d(this.dim.l, this.dim.h),
    new Triplet(this.dim.w/2,0,0),
    new Triplet(0,-90,0)
  );
  this.front = new Face(this,
    'brown',
    new Dimension2d(this.dim.w,this.dim.h),
    new Triplet(0,0,-this.dim.l/2),
    new Triplet(0,0,0)
  );
  this.rear = new Face(this,
    'pink',
    new Dimension2d(this.dim.w,this.dim.h),
    new Triplet(0,0,this.dim.l/2),
    new Triplet(180,0,0)
  );
  this.ceiling = new Face(this,
    'purple',
    new Dimension2d(this.dim.w,this.dim.l),
    new Triplet(0,-this.dim.h/2,0),
    new Triplet(-90,0,0)
  );
  this.floor = new Face(this,
    'green',
    new Dimension2d(this.dim.w,this.dim.l),
    new Triplet(0,this.dim.h/2,0),
    new Triplet(90,0,0)
  );
  //this.floor = new Face(this,'green',this.dim.l,this.dim.w,0,((this.dim.h/2)),0,90,0,0);

  var test = new Shape(this.front,
    'black',
    new Dimension2d(100,100),
    new Triplet(150,150,0),
    new Triplet(0,0,0)
  );


}

/*World.prototype = {
  updatePosition: function (pos) {
    this.position = pos;
    CssUtils.insert(this.node, CssUtils.transform(pos.x,pos.y,pos.z,0,0,0) );
  }
};*/



/* Plane -------------------------------------------------- */

//function Face(parent, color, w,h,x,y,z,rx,ry,rz) {
function Face(parent, color, dimensions,position,rotation) {
  this.node = HtmlUtils.createElem(parent.node,null,'face');
  this.color = color;
  this.width = dimensions.w;
  this.height = dimensions.h;
  this.position = position;
  this.rotation = rotation;
  CssUtils.insert(
    this.node,
    CssUtils.base(),
    CssUtils.size(this.width,this.height),
    CssUtils.transform(this.position.x,this.position.y,this.position.z,this.rotation.x,this.rotation.y,this.rotation.z),
    CssUtils.bgColor(color)
  );
}

function Shape(parent, color, dimensions,position,rotation){
  var cutter_top = 90;
  var cutter_left = 65;
  var cutter_rotation = 0;

  var rad = GeneralUtils.toRadians(cutter_rotation);

  var filler_left  =  -cutter_left*Math.cos(rad) -cutter_top*Math.sin(rad);
  var filler_top =  cutter_left* Math.sin(rad) -cutter_top*Math.cos(rad);

  this.node = HtmlUtils.createElem(parent.node,null,'shape');
  this.color = color;
  this.width = dimensions.w;
  this.height = dimensions.h;
  this.position = position;
  this.rotation = rotation;
  CssUtils.insert( this.node,
    CssUtils.base(),
    CssUtils.size(this.width,this.height),
    //this formula (to find center) is not accurate
    CssUtils.origin((cutter_top+100)/2,(cutter_left+100)/2,0),
    CssUtils.transform(this.position.x,this.position.y,this.position.z,this.rotation.x,this.rotation.y,this.rotation.z)
  );

  //testing!!!
  var point = HtmlUtils.createElem(this.node,null,'point');
  CssUtils.insert( point,
    CssUtils.absolutePosition((cutter_top+100)/2,(cutter_left+100)/2)
  );

  var cutter = HtmlUtils.createElem(this.node,null,'cutter');
  CssUtils.insert( cutter,
    CssUtils.absolutePosition(cutter_top,cutter_left),
    CssUtils.transform(0,0,0,0,0,cutter_rotation)
  );

  var filler = HtmlUtils.createElem(cutter,null,'filler');
  CssUtils.insert(
    filler,
    CssUtils.absolutePosition(filler_top,filler_left),
    CssUtils.transform(0,0,0,0,0,-cutter_rotation)
  );

}



/*-----------------------*/
window.onload = function() {
//$(document).ready(function () {

  var zeroTriplet = new Triplet();
  var vp = new Viewport();
  var cam = new Camera(vp);
  cam.updateRotation(new Triplet());
  var world = new World(cam.node);
  world.updatePosition(new Triplet());
  world.createRoom(new Triplet(),new Dimension3d(2000,1000,1500),'first-room');


  function move(direction) {
    console.log('move ' + direction)
    var speed = 6;

    var pos = world.position;
    var rot = cam.rotation;
    //var xo = Math.sin(rot.z * 0.0174532925);
    //var yo = Math.cos(rot.z * 0.0174532925);
    //viewport.camera.position.x -= xo * speed;
    //viewport.camera.position.y -= yo * speed;
    //var toRad = GeneralUtils.toRadians;

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

    var rot_rad = GeneralUtils.toRadians(rot.y + dir_angles);

    pos.x -= speed*Math.sin(rot_rad);
    pos.z += speed*Math.cos(rot_rad);

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
