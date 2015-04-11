
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

/* Triplet -------------------------------------------------- */

function Triplet( x, y, z ) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
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
    this.rotation = rot;
    CssUtils.insert(this.node, CssUtils.transform(0,0,this.perspective,rot.x,rot.y,0) );
  }
};

/* World -------------------------------------------------- */

function World(cameraNode) {
  this.node = HtmlUtils.createElem(cameraNode, 'world2');
  this.position = new Triplet;
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
  this.position = position || new Triplet;
  this.dim = dimensions || {w:2000,l:2000,h:700}
  CssUtils.insert(
    this.node,
    CssUtils.base(),
    CssUtils.transform(this.position.x,this.position.y,this.position.z,0,0,0)
  );

  this.left = new Face(this,'yellow',this.dim.l,this.dim.h,(-(this.dim.w/2)),0,0,0,90,0);
  this.right = new Face(this,'blue',this.dim.l,this.dim.h,((this.dim.w/2)),0,0,0,-90,0);
  this.front = new Face(this,'brown',this.dim.l,this.dim.h,0,0,(-(this.dim.w/2)),0,0,0);
  this.rear = new Face(this,'pink',this.dim.l,this.dim.h,0,0,((this.dim.w/2)),180,0,0);
  this.ceiling = new Face(this,'purple',this.dim.l,this.dim.w,0,(-(this.dim.h/2)),0,-90,0,0);
  this.floor = new Face(this,'green',this.dim.l,this.dim.w,0,((this.dim.h/2)),0,90,0,0);



}

/*World.prototype = {
  updatePosition: function (pos) {
    this.position = pos;
    CssUtils.insert(this.node, CssUtils.transform(pos.x,pos.y,pos.z,0,0,0) );
  }
};*/



/* Plane -------------------------------------------------- */

function Face(father, color, w,h,x,y,z,rx,ry,rz) {
  l(arguments)
  this.node = HtmlUtils.createElem(father.node,null,'face');
  this.colour = color;
  this.width = w;
  this.height = h;
  this.position = new Triplet(x, y, z);
  this.rotation = new Triplet(rx, ry, rz);
  l(ry)
  CssUtils.insert(
    this.node,
    CssUtils.base(),
    CssUtils.size(this.width,this.height),
    CssUtils.transform(this.position.x,this.position.y,this.position.z,this.rotation.x,this.rotation.y,this.rotation.z),
    CssUtils.bgColor(color)
  );
}



/*-----------------------*/
window.onload = function() {
//$(document).ready(function () {

  var zeroTriplet = new Triplet;
  var vp = new Viewport();
  var cam = new Camera(vp);
  cam.updateRotation(zeroTriplet);
  var w = new World(cam.node);
  w.updatePosition(zeroTriplet);
  w.createRoom();


  function move(direction) {
    console.log('move ' + direction)
    var pos = w.position;

    switch (direction) {
      case 'forward':
        pos.x++;
        break;
      case 'backward':
        pos.x--;
        break;
      case 'right':
        pos.z++;
        break;
      case 'left':
        pos.z--;
        break;
    }
    w.updatePosition(pos)

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
