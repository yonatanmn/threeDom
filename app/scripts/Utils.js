function l() { //short for debugging;
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
      return (angle * (Math.PI / 180)).toFixed(2);
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
    insert: function (node/*,base(),size(w,h)...*/) {
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

    base: function() {
      return (
        this.absolutePosition(50,50) +
        this.strProperties(
          [vendorPrefix + "transform-style","preserve-3d"]
        )
      );
    },

    absolutePosition: function (top,left) {
      return (
        this.strProperties(
          ["position","absolute"],
          ["top",this.unit(top,'%')],
          ["left",this.unit(left,'%')]
        )
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
    origin: function(a, c, e) {
      return vendorPrefix + "transform-origin:" + a.toFixed(2) + "px " + c.toFixed(2) + "px " + e.toFixed(2) + "px;"
    },
    V: function(a) {
      return a ? "" : vendorPrefix + "backface-visibility:hidden;"
    },
    perspective: function(a) {
      return this.strProperties(vendorPrefix + "perspective", this.unit(a, 'px'));
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
    clone: function(a) {
      var b;
      a instanceof v && (b = new v);
      a instanceof q && (b = new q(a.qa, a.width, a.height, a.position.x, a.position.y));
      if (b && b.i)
        for (var c = 0; c < a.i.length; c++) b.add(CssUtils.clone(a.i[c]));
      return b
    }
  }
}();