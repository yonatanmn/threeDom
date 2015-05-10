/**
 * http://www.keithclark.co.uk/labs/css-fps/old/
 */


/* CSS Utility Functions
 -------------------------------------------------- */

var CssUtils = (function() {
  var s = document.documentElement.style;
  var vendorPrefix =
    (s.WebkitTransform !== undefined && "-webkit-") ||
    (s.MozTransform !== undefined && "-moz-") ||
    (s.msTransform !== undefined && "-ms-") || "";

  return {
    translate: function( x, y, z, rx, ry, rz ) {
      return vendorPrefix + "transform:" +
        "translate3d(" + x + "px," + y + "px," + z + "px)" +
        "rotateX(" + rx + "deg)" +
        "rotateY("  +ry + "deg)" +
        "rotateZ(" + rz + "deg);"
    },
    origin: function( x, y, z ) {
      return vendorPrefix + "transform-origin:" + x + "px " + y + "px " + z + "px;";
    },
    texture: function( colour, rx, ry, rz ) {
      var a = Math.abs(-0.5+ry/180)/1.5;
      if (rz!==0) {
        a/=1.75;
      }
      return "background:"+vendorPrefix +"linear-gradient(rgba(0,0,0," + a + "),rgba(0,0,0," + a + "))," + colour + ";";
    }
  }
}());


/* XYZ
 -------------------------------------------------- */

function Triplet( x, y, z ) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

/* Camera
 -------------------------------------------------- */

function Camera( world, x, y, z, rx, ry, rz) {
  this.world = world;
  this.position = new Triplet(x, y, z);
  this.rotation = new Triplet(rx, ry, rz);
  this.fov = 700;
}

Camera.prototype = {
  update: function() {
    if (this.world) {
      this.world.node.style.cssText=
        CssUtils.origin( -this.position.x, -this.position.y, -this.position.z) +
        CssUtils.translate( this.position.x, this.position.y, this.fov, this.rotation.x, this.rotation.y, this.rotation.z)
    }
  }
}

/* Plane
 -------------------------------------------------- */

function Plane( colour, w,h,x,y,z,rx,ry,rz) {
  this.node = document.createElement("div")
  this.node.className="plane"
  this.colour = colour
  this.width = w;
  this.height = h;
  this.position = new Triplet(x, y, z);
  this.rotation = new Triplet(rx, ry, rz);
  this.update();
}

Plane.prototype = {
  update: function() {
    this.node.style.cssText +=
      "width:" + this.width + "px;" +
      "height:" + this.height + "px;" +
      CssUtils.texture(this.colour, this.rotation.x, this.rotation.y, this.rotation.z) +
      CssUtils.translate( this.position.x, this.position.y, this.position.z, this.rotation.x, this.rotation.y, this.rotation.z)
  }
}

/* World
 -------------------------------------------------- */

function World( viewport ) {
  this.node = document.createElement("div")
  this.node.className = "world"
  viewport.node.appendChild(this.node)
  viewport.camera.world = this;
}

World.prototype = {
  addPlane: function( plane ) {
    this.node.appendChild(plane.node)
  }
}

/* Viewport
 -------------------------------------------------- */

function Viewport( node ) {
  this.node = document.createElement("div")
  this.node.className = "viewport"
  this.camera = new Camera()
  node.appendChild(this.node)
}

window.onload = function() {

  var maxSpeed = 5;
  var accel = 0.2;
  var speed = 0;
  var viewport = new Viewport( document.body );
  var world = new World( viewport );
  var keyState = {
    forward: false,
    backward: false,
    strafeLeft: false,
    strafeRight: false
  };
  var pointer = { x: 0, y: 0 };

  function buildCube( colour, w, h, d, x, y, z, rx, ry, rz ) {

    world.addPlane( new Plane(colour, h, w, x, y, z, 0, 180, 90));
    world.addPlane( new Plane(colour, w, d, x, y, z, 90, 0, 0));
    world.addPlane( new Plane(colour, d, h, x, y, z, 0, 270, 0));
    world.addPlane( new Plane(colour, d, h, x+w, y, z+d, 0, 90, 0));
    world.addPlane( new Plane(colour, w, d, x+w, y+h, z, 90, 180, 0));
    world.addPlane( new Plane(colour, w, h, x, y, z+d, 0, 0, 0));
  }

  // floor
  world.addPlane( new Plane("url(wood.jpg)", 800, 800, -400, 400, 53, 180, 0, 0));

  // walls
  world.addPlane( new Plane("url(wall.jpg?3)", 800, 500, 400, -400, -447, 270, 0,180));
  world.addPlane( new Plane("url(wall.jpg?3)", 800, 500, -400, -400, -447, 270, 90, 180));
  world.addPlane( new Plane("url(wall.jpg?3)", 800, 500, -400, 400, -447, 90, 00, 0,0));
  world.addPlane( new Plane("url(wall.jpg?3)", 800, 500, 400, 400, -447, 90, 270, 0));

  // rug
  world.addPlane( new Plane("url(rug.jpg)", 200, 340, 100, -170, 52,0,180,0));

  // table
  buildCube("url(desk.jpg)", 10, 10, 100, -50, -100, -49);
  buildCube("url(desk.jpg)", 10, 10, 100, 50, -100, -49);
  buildCube("url(desk.jpg)", 10, 10, 100, -50, 100, -49);
  buildCube("url(desk.jpg)", 10, 10, 100, 50, 100, -49);
  buildCube("url(desk.jpg)", 130, 250, 15, -60, -120, -65);

  // chair
  buildCube("url(desk.jpg)", 10, 10, 55, 135, -30, -4);
  buildCube("url(desk.jpg)", 10, 10, 55, 135, 30, -4);
  buildCube("url(desk.jpg)", 10, 10, 55, 75, -30, -4);
  buildCube("url(desk.jpg)", 10, 10, 55, 75, 30, -4);
  buildCube("#111", 60, 70, 15, 75, -30, -20);
  buildCube("#111", 10, 70, 95, 135, -30, -100);

  // mac
  buildCube("#eee", 10, 120, 85, -30, -60, -170);
  buildCube("#ccc", 40, 50, 2, -50, -25, -67);
  world.addPlane( new Plane("url(osx.jpg)", 110, 65,-19,-55,-165,90,90,0));

  //buildCube("#ddd", 2, 50, 50, -50, -25, -118);
  world.addPlane( new Plane("#bbb", 2, 50,-33,-25,-115,90,0,20));
  world.addPlane( new Plane("#999", 50, 50,-33,-25,-115,0,250,0));
  world.addPlane( new Plane("#bbb", 2, 50,-31,25,-115,90,180,340));
  world.addPlane( new Plane("#eee", 50, 50,-48,-25,-68,0,70,0));
  world.addPlane( new Plane("#ddd", 2, 50,-30,-25,-115,0,160,0));

  // keyboard
  buildCube("url(mac-keybd.png)", 31, 70, 1, 10, -35, -67);

  // mouse
  buildCube("#eee", 20, 12, 2, 20, 60, -69);

  // bookshelf
  buildCube("url(desk.jpg)", 10, 50, 300, -350, 345, -250);
  buildCube("url(desk.jpg)", 10, 50, 300, -150, 345, -250);
  buildCube("url(desk.jpg)", 190, 50, 10, -340, 345, -250); // shelf
  buildCube("url(desk.jpg)", 190, 50, 10, -340, 345, -160); // shelf
  buildCube("url(desk.jpg)", 190, 50, 10, -340, 345, -65); // shelf
  buildCube("url(desk.jpg)", 190, 50, 10, -340, 345, 30); // shelf

  viewport.camera.position.x=-250
  viewport.camera.position.y=180
  viewport.camera.position.z=150
  viewport.camera.rotation.x=270
  viewport.camera.rotation.y=0
  viewport.camera.rotation.z=-60
  viewport.camera.update();

  window.addEventListener("devicemotion", function(ev) {
    keyState.forward = ev.accelerationIncludingGravity.z<-6;
    keyState.backward = ev.accelerationIncludingGravity.z>3;
  }, false);

  document.addEventListener("touchstart", function(ev) {
    pointer.x = ev.targetTouches[0].pageX;
    pointer.y = ev.targetTouches[0].pageY;
    ev.preventDefault();
  }, false);

  document.addEventListener("touchmove", function(ev) {
    viewport.camera.rotation.x -= (ev.targetTouches[0].pageY - pointer.y)/2;
    viewport.camera.rotation.z += (ev.targetTouches[0].pageX - pointer.x)/2;
    pointer.x = ev.targetTouches[0].pageX;
    pointer.y = ev.targetTouches[0].pageY;
    ev.preventDefault();
  }, false);

  document.addEventListener("mouseover", function(ev) {
    pointer.x = ev.pageX;
    pointer.y = ev.pageY;
    document.removeEventListener("mouseover", arguments.callee)
  }, false);

  document.addEventListener("mousemove", function(ev) {
    viewport.camera.rotation.x -= (ev.pageY - pointer.y)/2;
    viewport.camera.rotation.z += (ev.pageX - pointer.x)/2;
    pointer.x = ev.pageX;
    pointer.y = ev.pageY;
  }, false);

  document.addEventListener("keydown", function(e) {
    //console.log(e.keyCode);
    switch (e.keyCode) {
      case 87:
        keyState.forward = true;
        break;
      case 83:
        keyState.backward = true;
        break;
    }
  }, false);

  document.addEventListener("keyup", function(e) {
    switch (e.keyCode) {
      case 87:
        keyState.forward = false;
        break;
      case 83:
        keyState.backward = false;
        break;
    }
  }, false);



  // Game Loop

  (function() {
    if (keyState.backward) {
      if (speed > -maxSpeed) speed -= accel;
    } else if (keyState.forward) {
      if (speed < maxSpeed) speed += accel;
    } else if (speed > 0) {
      speed = Math.max( speed - accel, 0);
    } else if (speed < 0) {
      speed = Math.max( speed + accel, 0);
    } else {
      speed = 0;
    }
    var xo = Math.sin(viewport.camera.rotation.z * 0.0174532925);
    var yo = Math.cos(viewport.camera.rotation.z * 0.0174532925);
    viewport.camera.position.x -= xo * speed;
    viewport.camera.position.y -= yo * speed;
    viewport.camera.update();

    setTimeout( arguments.callee, 15);

  })();
}
