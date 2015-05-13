/**
 * :: [[a],[b]] -> [[a],[]...,[b]]
 * @param a [[],[]] (coord)
 * @param b [[],[]] (coord)
 * @param steepness {int} between 0-1. 1 is half circle, 0.01 is almost straight line
 * @param resolution {int} from 1 to inf, number of new points = softness of roundness (low num is more edgy),
 * @param toOutside {bool} - roundness direction (belly-inward/ back-outward)
 * @returns {*[]} - [a,new points...,b]
 */
function addRoundness(a,b,steepness,resolution,toOutside) {
  var aPt = new XY(a);
  var bPt = new XY(b);
  var pts = GeneralUtils.pointsDistance(aPt,bPt);

  //ellipse
  var ell = {
    w: pts.dist/2,
    h: pts.dist/2 * steepness
  };

  var center = new XY((aPt.x + pts.delX/2),(aPt.y + pts.delY/2));
  var ang = pts.rad;

  var newCords=[a];

  for(var i= 1,T ,
        acosT, bsinT,
        sina = Math.sin(ang), cosa = Math.cos(ang);
      i<=resolution; i++) {

    //draw pont from center using T as changing angle (eg. 150,120,90,60,30)
    T = Math.PI - Math.PI/(resolution+1)* i;// + ang;

    //angle direction will determine belly/back
    if(toOutside){T=-T}

    acosT = ell.w * Math.cos(T);
    bsinT = ell.h * Math.sin(T);

    //create point on ellipe [acosT,bsinT] and rotate with rotation matrix
    var  x = cosa * ( acosT ) - sina * ( bsinT);  //x
    var  y = sina * ( acosT ) + cosa * ( bsinT);   //y

    // move that with relation to center
    // push
    newCords.push([
      x + center.x,
      y + center.y
    ]);

  }

  newCords.push(b);

  return(newCords);

}

var rndnss =  4;
var ltrWdth = 20;
var LetterCoordinates= {
  Y: [[0, 0],[30, 0], [50, 30], [70, 0], [100, 0], [65, 55], [65, 100], [35, 100], [35, 55]],
  Ytest:
    []
    .concat(addRoundness([0, 0],[30, 0],0.2,14,false))
    .concat(addRoundness([50, 30],[70, 0],0.9,12,false))
    //.concat([[50,30], [70,0]])
    .concat([[100,0],[65,55],[65, 100], [35, 100], [35, 55]]),
  C: [].concat(
    addRoundness([100, 100],[100, 0],1,rndnss,true),
    addRoundness([100, ltrWdth],[100, 100-ltrWdth],1,rndnss,false)
  ),
  O:[].concat(
    addRoundness([100,50],[0,50],1,rndnss,true),
    addRoundness([0,49.9],[100,50],1,rndnss,true),
    addRoundness([100-ltrWdth,50],[ltrWdth,50],1,rndnss,false),
    addRoundness([ltrWdth,50.1],[100-ltrWdth,50],1,rndnss,false)
  ),
  U:[].concat(
    [[100,0]],
    addRoundness([100,50],[0,50],1,rndnss,true),
    [[0,0],[ltrWdth,0]],
    addRoundness([ltrWdth,50],[100-ltrWdth,50],1,rndnss,false),
    [[100-ltrWdth,0]]
  ),
  G:[].concat(
    //[[100-ltrWdth,20]],
    addRoundness([100,15], [0,85],1,rndnss,false),
    addRoundness([0,50.1], [100,50],1,rndnss,true),
    [[60,50],[60,50+ltrWdth]],
    addRoundness([100-ltrWdth,60],[ltrWdth,50],1,rndnss,false),
    addRoundness([ltrWdth,50.1],[100-ltrWdth,20],1,rndnss,false)

  )

};
//addRoundness(LetterCoordinates.Y,3,20,3);
//addRoundness([50, 30], [70, 0],50,2)

//log(CssUtils.clipPath(LetterCoordinates.Y))


