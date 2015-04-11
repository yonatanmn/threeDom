var CssUtils = function() {
  var s = document.documentElement.style;
  var vendorPrefix =  (s.WebkitTransform !== undefined && "-webkit-") ||
    (s.MozTransform !== undefined && "-moz-") ||
    (s.msTransform !== undefined && "-ms-") || "";
  BG_BlendSupport &= void 0 !== s.backgroundBlendMode;
  return {
    base: function() {
      return "position: absolute;left:50%;top:50%;" + vendorPrefix + "transform-style:preserve-3d;";
    },
    size: function(w, h) {
      return (
      "width:" + w.toFixed(2) + "px;" +
      "height:" + h.toFixed(2) + "px;" +
      "margin-left:" + -(w / 2).toFixed(2) + "px;" +
      "margin-top:" + -(h / 2).toFixed(2) + "px;"
      );
    },
    translate: function(x, y, z, rx, ry, rz, skx, sky) {
      return (
      vendorPrefix + "transform:" +
      "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px," + z.toFixed(2) + "px)" +
      "rotateX(" + rx.toFixed(2) + "deg)" +
      "rotateY(" + ry.toFixed(2) + "deg)" +
      "rotateZ(" + rz.toFixed(2) + "deg)" +
      "skewX(" + (skx || 0) + "deg)" +
      "skewY(" + (sky || 0) + "deg);"
      )
    },
    origin: function(a, c, e) {
      return vendorPrefix + "transform-origin:" + a.toFixed(2) + "px " + c.toFixed(2) + "px " + e.toFixed(2) + "px;"
    },
    V: function(a) {
      return a ? "" : vendorPrefix + "backface-visibility:hidden;"
    },
    perspective: function(a) {
      return vendorPrefix + "perspective:" + a + "px;"
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
