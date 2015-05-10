/**
 * [a],[b] -> [a],[m],[b]
 * @param a = XY
 * @param b = XY
 * @param roundness
 */
function addRoundness(arr,i,roundness,repetition){
  log(arr)

  var a = new XY(arr[i]);
  var b = new XY(arr[i+1])
 log(a)
 log(b)
  var pts = GeneralUtils.pointsDistance(a,b);
  //log(pts)
  //log(a.x + pts.delX/2)
  //log(a.y + pts.delY/2)
  var new_angle = 90 - pts.deg;
  var distance = pts.dist * roundness / 100;
  var center = new XY((a.x + pts.delX/2),(a.y + pts.delY/2));

  var newPoint = GeneralUtils.getNewPointByDistAndAngle(center,new_angle,distance);

  arr.splice(i+1,0,[newPoint.x,newPoint.y]);
  log(arr)

  if (repetition > 1 ) {
    repetition--;
    return addRoundness(arr,i,roundness,repetition)
  }
  return arr;
  //
  //new_x = center.x + Math.cos(new_angle) * distance;
  //new_y = center.y + Math.sin(new_angle) * distance;
  ////var newPoint =
}
//
//function fromPttoPt(point,degree,distance){
//
//}


var LetterCoordinates= {
  Y: [[0, 0],[30, 0], [50, 30], [70, 0], [100, 0], [65, 55], [65, 100], [35, 100], [35, 55]]
};
addRoundness(LetterCoordinates.Y,3,20,3);
