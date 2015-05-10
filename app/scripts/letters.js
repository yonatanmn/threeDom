/**
 * [aPt],[bPt] -> [a],[m],[b]
 * @param a = XY
 * @param b = XY
 * @param softener
 */
function addRoundness(a,b,softener,newPtsNum){
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
  //var distance = pts.dist * radius / 100;
  var distance = pts.dist/2;

  var center = new XY((aPt.x + pts.delX/2),(aPt.y + pts.delY/2));

  var divider = 180/(newPtsNum+1)
  var newPoint;
  var newCords=[a];
  //log(center)
  //log(pts.deg)
  //log(divider)
  //log(distance)

  for(var i= 1,radiusAgnle,soften; i<=newPtsNum; i++){
    //radiusAgnle = 180 + divider*i + pts.deg ;
    radiusAgnle = 180 - divider*i + pts.deg ;
    //soften = Math.cos(Math.sin(GeneralUtils.toRadians(radiusAgnle)) * Math.sin(GeneralUtils.toRadians(radius)))
    soften = softener *  Math.sin(GeneralUtils.toRadians(radiusAgnle))
    soften = 0.6 *  Math.sin(GeneralUtils.toRadians(radiusAgnle))
    //log(radiusAgnle)
    //log(soften)
    //var newDist = distance -  distance * soften;
    //log(newDist)

    //var newDist =distance *  Math.cos(softener * Math.PI/2*(Math.sin(GeneralUtils.toRadians(radiusAgnle))))
var newDist = distance - distance * 0.5 * Math.sqrt(0.75 - Math.sin(GeneralUtils.toRadians(radiusAgnle)))

    newPoint = GeneralUtils.getNewPointByDistAndAngle(center,radiusAgnle,  distance)
    //log(newPoint.y)
    //log(soften)

    log(GeneralUtils.getTrigo(pts.deg))
    var trig= GeneralUtils.getTrigo(pts.deg)

    newPoint.y -= /* Math.cos*/(newPoint.y  *  (0.6 /*  * (Math.sin(GeneralUtils.toRadians(radiusAgnle)))*/))
    newPoint.x -=  Math.sin(newPoint.x  *  (0.6 /* * (Math.cos(GeneralUtils.toRadians(radiusAgnle)))*/))
    //newPoint.x = newPoint.x  * Math.abs(soften)

    //log(newPoint.y)
    //newPoint.x = newPoint.x  - newPoint.x * 0.6 * Math.sin(GeneralUtils.toRadians(90))

    //newPoint = GeneralUtils.getNewPointByDistAndAngle(center,(180 + divider*i + pts.deg ),distance)
    //var x =Math.cos(GeneralUtils.toRadians(radiusAgnle));
    //newPoint = {
    //  x: x,
    //  y:0.5*(2*Math.sqrt(1-Math.pow(x,2))-1)
    //
    //}


    newCords.push([newPoint.x,newPoint.y])

  }
  newCords.push(b);

  log((newCords))
  return(newCords);

}

var LetterCoordinates= {
  Y2: [[0, 0],[30, 0], [50, 30], [70, 0], [100, 0], [65, 55], [65, 100], [35, 100], [35, 55]],
  Y:
    []
    .concat(addRoundness([0, 0],[30, 0],0.9,12))
    .concat(addRoundness([50, 30],[70, 0],0.9,12))
    //.concat(addRoundness([ ],50,3))
    //.concat([[100,0], [65,55]])
    .concat([[100,0],[65,55],[65, 100], [35, 100], [35, 55]])
};
//addRoundness(LetterCoordinates.Y,3,20,3);
//addRoundness([50, 30], [70, 0],50,2)

//log(CssUtils.clipPath(LetterCoordinates.Y))


