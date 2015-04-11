
function getRotationDegrees(obj) {
  var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
  if(matrix !== 'none') {
    //var values = matrix.split('(')[1].split(')')[0].split(',');
    var values = matrix.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');

    var a = values[0];
    var b = values[2];
    console.log(values)
    var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

    var z = Math.round(Math.atan2(values[4], values[0]) * (180/Math.PI))
    var x = Math.round(Math.atan2(values[9], values[10]) * (180/Math.PI))
    var y = Math.round(Math.tan(values[8]) * (180/Math.PI));
    console.log('x '+ -x)
    console.log('y '+y)
    console.log('z '+ -z)

    for(var i=0;i<values.length;i++){
      for(var j=0;j<values.length;j++){
        var e = Math.round(Math.atan2(values[i], values[j]) * (180/Math.PI))
        //console.log(i,j,e,90 - e, e-90)
      }
    }

    console.log('==========================')
    for(var i=0;i<values.length;i++){
      var e = Math.round(Math.atan(values[i]) * (180/Math.PI));
      var f = Math.round(Math.acos(values[i]) * (180/Math.PI));
      var g = Math.round(Math.asin(values[i]) * (180/Math.PI));
      var h = Math.round(Math.tan(values[i]) * (180/Math.PI));
      //console.log(i,e,90 - e, e-90)
      //console.log(i,f,90 - f, f-90)
      //console.log(i,g,90 - g, g-90)
      //console.log(i,h,90 - h, h-90)
    }
    //Math.round(Math.atan2(values[0], values[6]) * (180/Math.PI))

    //var scale = Math.sqrt(a*a + b*b);
  } else { var angle = 0; }
  return (angle < 0) ? angle + 360 : angle;
}
