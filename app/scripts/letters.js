/**
 * [aPt],[bPt] -> [a],[m],[b]
 * @param a = XY
 * @param b = XY
 * @param radius
 */
function addRoundness(a,b,radius,newPtsNum){
  //log(arr)

  var aPt = new XY(a);
  var bPt = new XY(b);
  //console.log('sdfsdf')
  //console.log(b)
 //log(a)
 //log(b)
  var pts = GeneralUtils.pointsDistance(aPt,bPt);
  //log(pts)
  //log(a.x + pts.delX/2)
  //log(a.y + pts.delY/2)
  var distance = pts.dist * radius / 100;

  var center = new XY((aPt.x + pts.delX/2),(aPt.y + pts.delY/2));

  var divider = 180/(newPtsNum+1)
  var newPoint;
  var newCords=[a];
  log(center)
  log(pts.deg)
  log(divider)
  log(distance)

  for(var i= 1; i<=newPtsNum; i++){
    newPoint = GeneralUtils.getNewPointByDistAndAngle(center,(divider*i -pts.deg),distance)
    newCords.push([newPoint.x,newPoint.y])

  }
  newCords.push(b);

  log(newCords)
  return(newCords);

  //var new_angle = 90 + pts.deg;

  //var newPoint = GeneralUtils.getNewPointByDistAndAngle(center,new_angle,distance);

  //arr.splice(i+1,0,[newPoint.x,newPoint.y]);
  //log(arr)
  //console.log('repetition ' + repetition)
  //console.log('new_angle ' + (new_angle))
  //console.log('new_angle in rads ' + GeneralUtils.toRadians(new_angle))
  //console.log('distance ' + distance)
  //console.log( 'center: ')
  //console.log( center)
  //console.log('new point: ')
  //console.log( newPoint)

  //
  //if (repetition > 1 ) {
  //  repetition--;
  //  //return addRoundness(arr,i,radius,repetition)
  //  var left =  addRoundness(a,newPoint,radius,repetition)
  //  var right =  addRoundness(newPoint,b,radius,repetition)
  //
  //}

  //return arr;
  //
  //new_x = center.x + Math.cos(new_angle) * distance;
  //new_y = center.y + Math.sin(new_angle) * distance;
  ////var newPoint =
}

//function addPointToCoordsArr(arr,)

var LetterCoordinates= {
  Y2: [[0, 0],[30, 0], [50, 30], [70, 0], [100, 0], [65, 55], [65, 100], [35, 100], [35, 55]],
  Y:
    [[0, 0],[30, 0], [50, 30], [70, 0]]
    //.concat(addRoundness([100,0],[65,55],50,3))
    .concat([[100,0], [65,55]])
    .concat([[65, 100], [35, 100], [35, 55]])
};
//addRoundness(LetterCoordinates.Y,3,20,3);
addRoundness([50, 30], [70, 0],50,2)
