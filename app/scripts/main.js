$(document).ready(function () {

  var glance = [0, 0]; // up/down,left/right - in deg

  function createWorld(){

  }

  function updateLook(){
    var x = getRotationDegrees($('#camera'));
    console.log(x)
  }

  function move(direction) {
    console.log('move ' + direction)
  }

  function look(direction) {
    console.log('look ' + direction)
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
    updateLook();
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


});
