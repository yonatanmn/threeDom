function log() { //short for debugging;
  console.log.apply(console, GeneralUtils.getArgs(arguments));
}

var GeneralUtils = function () {
  return {
    getArgs: function (args, startAt) {
      startAt = startAt || 0;
      return Array.prototype.slice.call(args, startAt);
    },

    //returns args always as array of arrays (if args[0] is not array, take args as one array)
    getArrayArgs: function (args, startAt) {
      var arrayArgs = GeneralUtils.getArgs(args, startAt);
      return Array.isArray(arrayArgs[0])? arrayArgs: [arrayArgs];
    },

    toRadians: function (angle) {
      return (angle * (Math.PI / 180));
    },

    toDegrees: function (rads) {
      return (rads * (180/Math.PI))
    },

    getTrigo: function (angle){
      var rad = this.toRadians(angle);
      return {
        sin:Math.sin(rad),
        cos:Math.cos(rad)
      };
    },

    pointsDistance: function (a,b) {
      var deltaX = b.x - a.x;
      var deltaY = b.y - a.y;
      var degrees =  GeneralUtils.toDegrees(Math.atan(deltaY/deltaX));
      //atan returns degree between -90 to 90, this fixes it:
      degrees += deltaX<0? 180 : 0;
      return {
        delX : deltaX,
        delY : deltaY,
        dist : Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)),
        deg: degrees

      }
    },

    /**
     *
     * @param start (XY)
     * @param deg
     * @param dist
     * @returns {XY}
     */
    getNewPointByDistAndAngle: function (start,deg,dist) {
      return new XY(
        start.x + Math.cos(deg) * dist,
        start.y + Math.sin(deg) * dist
      )
    },

    stringCreator: function (structure) {
      return function () {
        var args = GeneralUtils.getArrayArgs(arguments);

        function property(prop,content) {
          if(typeof prop !== 'string') throw 'property should be a string';
          if(typeof content !== 'string') throw 'content should be a string';
          return structure(prop, content);
        }
        return args.reduce(function(p,c){
          return p + property(c[0],c[1]);
        },'');
      }
    }
  }
}();

var HtmlUtils = function () {
  return {
    createElem: function (appendTo,id,className,type) {
      type = type || 'div';
      var el = document.createElement(type);
      if (id) el.setAttribute("id", id);
      if (className) el.className = className;
      if(!(appendTo instanceof Element)) appendTo = document.querySelector(appendTo);
      appendTo.insertBefore(el, appendTo.firstChild);
      return el;
    },

    createShape: function (parent,id) {
      //var el = this.createElem(parent,id,'shape');
      //var cutter = this.createElem(el,null,'cutter');
    }
  }
}();

var CssUtils = function() {
  var s = document.documentElement.style;
  var vendorPrefix =  (s.WebkitTransform !== undefined && "-webkit-") ||
    (s.MozTransform !== undefined && "-moz-") ||
    (s.msTransform !== undefined && "-ms-") || "";
  var BG_BlendSupport = 1;
  BG_BlendSupport &= void 0 !== s.backgroundBlendMode;

  return {
    inject: function (node/*,base(),size(w,h)...*/) {
      //l(arguments)
      node.style.cssText = GeneralUtils.getArgs(arguments,1).reduce(function (p,c) {
        return p + c
      },node.style.cssText);
    },

    unit: function (size,defaultUnit) {
      size = size || 0;
      if (typeof size === 'string') {return size}
      if (typeof defaultUnit !=='string') throw 'defaultUnit is not a string';
      return size.toFixed(2) + defaultUnit;
    },

    //gets two params (prop,content) or a list of arrays ([prop,content],[..],[..]) and returns a css string
    strProperties:  GeneralUtils.stringCreator(function(prop,content){
        return prop + ":" + content + ";"
    }),
    strInnerProperties:  GeneralUtils.stringCreator(function(prop,content){
        return prop + "(" + content + ")"
    }),

    absolutePosition: function (top,left) {
      return (
        this.strProperties(
          ["position","absolute"],
          ["top",this.unit(top,'%')],
          ["left",this.unit(left,'%')]
        )
      );
    },

    base: function() {
      return (
        this.absolutePosition(50,50) +
        this.strProperties(
          [vendorPrefix + "transform-style","preserve-3d"]
        )
      );
    },

    bgPosition: function (x, y) {
      return this.strProperties(
        "background-position",
        this.unit(x, '%') + ' ' + this.unit(y, '%')
      )
    },

    bgImageCover: function(url) {
      return this.strProperties(
        ['background-size', 'cover'],
        ['background-image', this.strInnerProperties('url',url)]
      )
    },

    clipPath: function (coordinates) {
      return(
        this.strProperties(vendorPrefix+ 'clip-path',
          this.strInnerProperties(
            'polygon', coordinates.map(function(c){return c[0]+'% '+c[1]+'%'}).toString()
          )
        )
      );
    },

    origin: function(x, y, z) {
      return this.strProperties(
        vendorPrefix + "transform-origin",
        this.unit(x, '%') + ' ' + this.unit(y, '%') + ' ' + this.unit(z, 'px')
      );
    },

    size: function(w, h) {
      return (
      this.strProperties(
        ["width",this.unit(w,'px')],
        ["height",this.unit(h,'px')],
        ["margin-left",this.unit(-(w / 2),'px')],
        ["margin-top",this.unit(-(h / 2),'px')])
      );
    },

    transform: function (x, y, z, rx, ry, rz, skx, sky) {
      return (

      this.strProperties(vendorPrefix + "transform",
        this.strInnerProperties(
          ["translate3d", [this.unit(x, 'px'), this.unit(y, 'px'), this.unit(z, 'px')].toString()],
          ["rotateX", this.unit(rx, 'deg')],
          ["rotateY", this.unit(ry, 'deg')],
          ["rotateZ", this.unit(rz, 'deg')],
          ["skewX", this.unit(skx, 'deg')],
          ["skewY", this.unit(sky, 'deg')]
        ))
      )
    },

    transform2: function (x, y, z, rx, ry, rz, skx, sky) {
      return (

        this.strProperties(vendorPrefix + "transform",
          this.strInnerProperties(
            ["translate3d", [this.unit(x, 'px'), this.unit(y, 'px'), this.unit(z, 'px')].toString()],
            ["rotateX", this.unit(rx, 'deg')],
            ["rotateY", this.unit(ry, 'deg')],
            ["rotateZ", this.unit(rz, 'deg')],
            ["skewX", this.unit(skx, 'deg')],
            ["skewY", this.unit(sky, 'deg')]
          ))
      )
    },



    backface: function(hide) {
      var visibility = hide? 'hidden':'visible';
      return this.strProperties(vendorPrefix + "backface-visibility",visibility);
      //return a ? "" : vendorPrefix + "backface-visibility:hidden;"
    },
    perspective: function(perspective) {
      return this.strProperties(vendorPrefix + "perspective", this.unit(perspective, 'px'));
    },
    bgColor: function (color) {
      return this.strProperties("background", color);
    },
    wa: function(a) {
      for (var b = 0, e = 0; e < L.length; e++) var p =
          L[e],
        p = c.k(c.add(p.u(), a)) / (100 + 10 * p.U),
        b = Math.max(b, 1 - p);
      return b
    },
    Y: function(a) {
      return V(a.l)
    },
    n: function(a) {
      var c = [],
        e = [],
        p = [],
        h = [],
        f = "",
        g = CssUtils.Y(a);
      g && ("-" == g.charAt(0) ? c.push(g) : c.push("url(" + g + ")"), e.push("100% 100%"), p.push("0 0"), h.push("multiply"));
      c.push("url(" + a.n.src + ")");
      e.push("auto");
      p.push((a.n.x || 0).toFixed(2) + "px -" + (a.n.y || 0).toFixed(2) + "px");
      a.n.ia && (f += vendorPrefix + "mask-image:url(" + a.n.src + ");" + vendorPrefix + "mask-position:" + (a.n.x || 0).toFixed(2) + "px -" + (a.n.y || 0).toFixed(2) + "px;");
      c.length && (f += "background:" +
      c.join() + ";");
      p.length && (f += "background-position:" + p.join() + ";");
      e.length && (f += "background-size: " + e.join() + ";");
      BG_BlendSupport && h.length && (f += "background-blend-mode: " + h.join() + ";");
      return f
    },
    /*clone: function(a) {
      var b;
      a instanceof v && (b = new v);
      a instanceof q && (b = new q(a.qa, a.width, a.height, a.position.x, a.position.y));
      if (b && b.i)
        for (var c = 0; c < a.i.length; c++) b.add(CssUtils.clone(a.i[c]));
      return b
    }*/
  }
}();
