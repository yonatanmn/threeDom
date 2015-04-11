
/* Viewport -------------------------------------------------- */

function Viewport() {
  this.perspective = 700; //px
  this.node = HtmlUtils.createElem('body','viewport2')
  CssUtils.insert(
    this.node,
    CssUtils.base(),
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
  this.glance = [0,0];
  this.perspective = vp.perspective;
  CssUtils.insert(
    this.node,
    CssUtils.base()
    //CssUtils.translate(0,0,perspective,glance[0],glance[1],0)
  );
}

Camera.prototype = {
  update: function (glance) {
    this.glance = glance;
    CssUtils.insert(
      this.node,
      CssUtils.translate(0,0,this.perspective,this.glance[0],this.glance[1],0)
    );
  }
};


/*-----------------------*/
window.onload = function() {
//$(document).ready(function () {

  var vp = new Viewport();
  var cam = new Camera(vp);
  cam.update([0,0]);


  var init = function () {
 //   createSpace()
  }();

  function createSpace(){
    /* --Create viewport-- */
    CssUtils.insert(
      HtmlUtils.createElem('body','viewport2'),
      CssUtils.base(),
      CssUtils.perspective(perspective)
    );
    /* --Create camera-- */
    camera = HtmlUtils.createElem('#viewport2','camera2');
    CssUtils.insert(
      camera,
      CssUtils.base()
      //CssUtils.translate(0,0,perspective,glance[0],glance[1],0)
    );



  }

/*

  function updateCamera(){


  }
*/

  function move(direction) {
    console.log('move ' + direction)
  }

  function look(direction) {
    console.log('look ' + direction)
    var glance = cam.glance;

    switch (direction) {
      case 'up':
        glance[0]++;
        break;
      case 'down':
        glance[0]--;
        break;
      case 'right':
        glance[1]++;
        break;
      case 'left':
        glance[1]--;
        break;
    }
    cam.update(glance)

  }

  $(document).on('keydown', function (e) {
    //console.log(e.keyCode)
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
