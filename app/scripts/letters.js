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


    function parse2(num){
      return parseFloat(Math.round(num * 100) / 100).toFixed(2);

    }
    // move that with relation to center
    // push
    newCords.push([
       parse2(x + center.x),
      parse2(y + center.y)
    ]);
  }

  newCords.push(b);

  return(newCords);

}

var rndnss =  14;
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
  T:[].concat(
    [[50-ltrWdth/2,100],[50-ltrWdth/2,ltrWdth],[50-3/2*ltrWdth,ltrWdth],[50-3/2*ltrWdth,0],[50+3/2*ltrWdth,0],[50+3/2*ltrWdth,ltrWdth],[50+ltrWdth/2,ltrWdth],[50+ltrWdth/2,100]]
  ),
  A:[].concat(
    [[80,100],[50,30],[37,60],[63,60],[69,74],[32,74],[20,100],[0,100],[50,0],[100,100]]
  ),
  U:[].concat(
    [[100,0]],
    addRoundness([100,50],[0,50],1,rndnss,true),
    [[0,0],[ltrWdth,0]],
    addRoundness([ltrWdth,50],[100-ltrWdth,50],1,rndnss,false),
    [[100-ltrWdth,0]]
  ),
  L:[].concat(
    [[0,0],[0,100],[50,100],[50,100-ltrWdth],[ltrWdth,100-ltrWdth],[ltrWdth,0]]
  ),
  V:[].concat(
    [[0,0],[50,100],[100,0],[100-ltrWdth,0],[50,64],[ltrWdth,0]]
  ),
  E:[].concat(
    [[0,0],[0,100],[50,100],[50,100-ltrWdth],[ltrWdth,100-ltrWdth],[ltrWdth,50+ltrWdth/2],[50,50+ltrWdth/2],[50,50-ltrWdth/2],[ltrWdth,50-ltrWdth/2],[ltrWdth,ltrWdth],[50,ltrWdth],[50,0]]
  ),
  F:[].concat(
    [[0,0],[0,100],[ltrWdth,100],[ltrWdth,50+ltrWdth/2],[50,50+ltrWdth/2],[50,50-ltrWdth/2],[ltrWdth,50-ltrWdth/2],[ltrWdth,ltrWdth],[50,ltrWdth],[50,0]]
  ),
  R:[].concat(
    [[0,0]],
    addRoundness([ltrWdth*2,0],[ltrWdth*2,50+ltrWdth/2],1,rndnss,true),
    [[50+ltrWdth,100],[50,100],[ltrWdth,50+ltrWdth/2],[ltrWdth,50-ltrWdth/2]],
    addRoundness([ltrWdth*2,50-ltrWdth/2],[ltrWdth*2,ltrWdth],1,rndnss,false),
    [[ltrWdth,ltrWdth],[ltrWdth,100],[0,100]]
  ),
  N:[].concat(
    [[0,0],[0,100],[ltrWdth,100],[ltrWdth,ltrWdth*1.5],[100-ltrWdth,100],[100,100],[100,0],[100-ltrWdth,0],[100-ltrWdth,100-ltrWdth*1.5],[ltrWdth,0]]
  ),
  D:[].concat(
    [[0,0]],
    addRoundness([ltrWdth,0],[ltrWdth,100],1,rndnss,true),
    addRoundness([ltrWdth,100-ltrWdth],[ltrWdth,ltrWdth],1,rndnss,false),
    [[ltrWdth,100],[0,100]]
  ),
  G:[].concat(
    [[100-20,0]],
    addRoundness([50,0], [50,100],1,rndnss,false),
    [[55.23,99.73],[65.45,97.55],[75,93.3], [83.46,87.16], [90.45,79.39],[95.68,70.34],[98.91,60.4], [100,50]],
    [[55,50],[50,50+ltrWdth*0.8]],
    addRoundness([100-ltrWdth-2,50+ltrWdth*0.8],[50,100-ltrWdth+2],0.3,rndnss*0.5,true),
    addRoundness([45,100-ltrWdth+1],[50+5,ltrWdth],1,rndnss,true),
    [[100-20-10,ltrWdth]]
  )
};

