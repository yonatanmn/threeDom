/**
 * http://keithclark.co.uk/labs/css-fps/desktop/
 */
(function() {
  function M(a, b) {
    this.set(a, b)
  }

  function s() {
    this.e = document.createElement("div");
    this.e.id = T++;
    this.position = c.create();
    this.rotation = c.create();
    this.v = new M
  }

  function G() {
    s.call(this);
    this.i = [];
    this.color = N.splice(0, 1)[0];
    N.push(this.color)
  }

  function x(a, b, d) {
    s.call(this);
    this.U = a;
    this.W = b;
    this.color = d;
    this.e.className = "light"
  }

  function P(a, b, d, n) {
    s.call(this);
    this.e.className = "line";
    this.length = a;
    this.color = b;
    d && this.setStart(d);
    n && this.setEnd(n)
  }

  function O(a, b) {
    this.min = a ? c.t(a) : c.create();
    this.max = b ? c.t(b) : c.create()
  }

  function Q() {
    this.position = c.create(0, 0, 0);
    this.direction = c.create(0, 0, -1)
  }

  function q(a, b, d, n, e) {
    s.call(this);
    this.n = a;
    this.width = b;
    this.height = d;
    this.L = e;
    this.la = !0;
    this.X = !1 !== n;
    this.e.className = "plane";
    this.q = {
      f: c.create(0, 0, 1),
      a: c.create(0, 0, 1),
      g: c.create(0, 0, 1),
      h: c.create(0, 0, 1)
    }
  }

  function v() {
    G.call(this);
    this.e.className = "assembly"
  }

  function R(a, b) {
    this.e = document.createElement("div");
    this.e.className = "viewport";
    this.C = document.createElement("div");
    this.C.className =
      "camera";
    this.o = {
      position: c.create(0, 0, 0),
      rotation: c.create(0, 0, 0)
    };
    this.r = new v;
    this.e.appendChild(this.C);
    this.C.appendChild(this.r.e);
    a.appendChild(this.e);
    this.ma(b || 700)
  }

  function S() {
    this.canvas = document.createElement("canvas");
    this.M = this.canvas.getContext("2d")
  }

  function U(a) {
    function b() {
      v.call(this)
    }

    function d(a, d, b, e) {
      v.call(this);
      this.add(new q({
        src: a.src
      }, d, b), 0, 0, e / 2, 0, 0, 0);
      this.add(new q({
        src: a.src
      }, d, b), 0, 0, -e / 2, 0, 180, 0);
      this.add(new q({
        src: a.src
      }, e, b), d / 2, 0, 0, 0, 90, 0);
      this.add(new q({
          src: a.src
        },
        e, b), -d / 2, 0, 0, 0, 270, 0);
      this.add(new q({
        src: a.src
      }, d, e), 0, -b / 2, 0, 90, 0, 0);
      this.add(new q({
        src: a.src
      }, d, e), 0, b / 2, 0, 270, 0, 0)
    }

    function n(a, d, b, e) {
      v.call(this);
      for (var n = Math.PI / e * 2, p = Math.tan(Math.PI / e), h = d * Math.tan(Math.PI / e), f = 0; f < e; f++) {
        var s = Math.sin(n * f) * d / 2,
          I = Math.cos(n * f) * d / 2,
          K = Math.atan2(s, I),
          A = new q({
            src: a.src,
            x: h * (e - f),
            na: h
          }, h + 1.5, b);
        A.q.h = A.q.f = c.create(-p, 0, 1);
        A.q.g = A.q.a = c.create(p, 0, 1);
        this.add(A, s, 0, I, 0, t.K(K), 0)
      }
    }

    function e() {
      d.call(this, {
        src: "../crate.jpg"
      }, 150, 150, 150)
    }

    function p() {
      n.call(this, {
        src: "../drum2.png"
      }, 100, 196, 16);
      this.add(new q({
        src: "../drum2.png",
        x: 0,
        y: 196,
        na: 102,
        xa: 102,
        ia: !0
      }, 102, 102, !1), 0, -98, 0, 90)
    }
    b.prototype = v.prototype;
    d.prototype = v.prototype;
    n.prototype = v.prototype;
    e.prototype = new v;
    p.prototype = v.prototype;
    var h = new b;
    h.add(new q({
      src: "../wall.jpg"
    }, 2E3, 700), 0, -350, -700, 0, 0, 0);
    h.add(new q({
      src: "../wall.jpg"
    }, 1E3, 700), 500, -350, 300, 0, 180, 0);
    h.add(new q({
      src: "../wall.jpg"
    }, 1E3, 700), 1E3, -350, -200, 180, 270, 0);
    h.add(new q({
        src: "../wall.jpg"
      },
      500, 1100), 0, -550, 550, 0, 270, 0);
    h.add(new q({
      src: "../wall.jpg"
    }, 600, 700), -700, -350, 300, 0, 180, 0);
    h.add(new q({
      src: "../wall.jpg"
    }, 1E3, 700), -1E3, -350, -200, 0, 90, 0);
    h.add(new q({
      src: "../floor.jpg"
    }, 2E3, 1E3, !1), 0, 0, -200, 90, 0, 0);
    h.add(new q({
      src: "../ceil.jpg"
    }, 2E3, 1E3, !1), 0, -700, -200, 270, 0, 0);
    for (var f = -1; 1 >= f; f++) h.add(new q({
      src: "../ceil.jpg"
    }, 100, 650), 75 + 552 * f, -325, -650, 0, 0, 0), h.add(new q({
      src: "../ceil.jpg"
    }, 50, 650), 125 + 552 * f, -325, -675, 0, 90, 0), h.add(new q({
        src: "../ceil.jpg"
      },
      50, 650), 25 + 552 * f, -325, -675, 0, 270, 0), h.add(new q({
      src: "../ceil.jpg"
    }, 100, 1E3), 75 + 552 * f, -650, -200, 270, 0, 0), h.add(new q({
      src: "../ceil.jpg"
    }, 1E3, 50), 125 + 552 * f, -675, -200, 0, 90, 0), h.add(new q({
      src: "../ceil.jpg"
    }, 1E3, 50), 25 + 552 * f, -675, -200, 0, 270, 0), h.add(new q({
      src: "../ceil.jpg"
    }, 100, 650), 75 + 552 * f, -325, 250, 0, 180, 0), h.add(new q({
      src: "../ceil.jpg"
    }, 50, 650), 125 + 552 * f, -325, 275, 0, 90, 0), h.add(new q({
      src: "../ceil.jpg"
    }, 50, 650), 25 + 552 * f, -325, 275, 0, 270, 0), h.add(new q({
        src: "../ceil.jpg"
      },
      101, 650), 75 + 552 * f, -325, -225, 0, 180, 0), h.add(new q({
      src: "../ceil.jpg"
    }, 101, 650), 75 + 552 * f, -325, -125, 0, 0, 0), h.add(new q({
      src: "../ceil.jpg"
    }, 101, 650), 125 + 552 * f, -325, -175, 0, 90, 0), h.add(new q({
      src: "../ceil.jpg"
    }, 101, 650), 25 + 552 * f, -325, -175, 0, 270, 0);
    h.add(new n({
      src: "../pipe2.jpg"
    }, 60, 2E3, 16), 0, -610, 180, 90, 0, 90);
    h.add(new n({
      src: "../pipe2.jpg"
    }, 40, 700, 12), 960, -350, -500, 0, 180, 0);
    h.add(new n({
      src: "../pipe2.jpg"
    }, 40, 700, 12), 960, -350, -420, 0, 180, 0);
    h.add(new e, -800, -75, -470);
    h.add(new e, -820, -225, -380, 0, 15);
    h.add(new e, -850, -75, -270, 0, -15);
    h.add(new p, -270, -98, -345);
    h.add(new p, 350, -98, 116, 0, 40);
    h.add(new p, 263, -98, -512);
    h.add(new p, 640, -98, -440, 0, 190, 0);
    h.add(new p, 90, -98, -20, 0, 120, 0);
    h.add(new x(200, 1, {
      G: 255,
      F: 110,
      a: 50
    }), -150, -630, 330);
    h.add(new x(85, .5, {
      G: 255,
      F: 140,
      a: 0
    }), -170, -820, 840);
    h.add(new q({
      src: "../wall.jpg"
    }, 400, 400), -200, -900, 300, 0, 0, 0);
    h.add(new q({
      src: "../wall.jpg"
    }, 1E3, 1100), -400, -550, 800, 0, 90, 0);
    for (f = 0; 10 > f; f++) h.add(new q({
      src: "../floor.jpg",
      y: 100 * f
    }, 400, 50), -201, 50 * -f - 25, 50 * f + 300, 0, 180), h.add(new q({
      src: "../floor.jpg",
      y: 100 * f + 50
    }, 400, 50), -201, 50 * -f - 50, 50 * f + 325, 90);
    h.add(new x(105, 1, {
      G: 128,
      F: 255,
      a: 0
    }), 70, -600, -400);
    f = new b;
    f.add(new q({
      src: "../floor.jpg"
    }, 1400, 500), -200, 0, 0, 90, 0, 0);
    f.add(new q({
      src: "../wall.jpg"
    }, 1E3, 600), 0, -300, -250, 0, 0, 0);
    f.add(new q({
      src: "../wall.jpg"
    }, 1400, 600), -200, -300, 250, 0, 180, 0);
    f.add(new q({
      src: "../ceil.jpg"
    }, 1400, 1E3), -200, -600, -250, 270, 0, 0);
    f.add(new q({
        src: "../wall.jpg"
      },
      500, 600), 500, -300, 0, 0, 270, 0);
    f.add(new e, -600, -75, 140, 0, -15);
    f.add(new p, -100, -98, -120, 0, 0);
    f.add(new x(125, 1, {
      G: 128,
      F: 178,
      a: 255
    }), 280, -400, -100);
    a.add(h, 100, 0, 0);
    a.add(f, 600, -500, 1050)
  }

  var BG_BlendSupport = !0;

  var c = {
      create: function(a, b, d) {
        return {
          x: a || 0,
          y: b || 0,
          z: d || 0
        }
      },
      add: function(a, b) {
        return {
          x: a.x + b.x,
          y: a.y + b.y,
          z: a.z + b.z
        }
      },
      sub: function(a, b) {
        return {
          x: a.x - b.x,
          y: a.y - b.y,
          z: a.z - b.z
        }
      },
      ya: function(a, b) {
        return {
          x: a.x * b.x,
          y: a.y * b.y,
          z: a.z * b.z
        }
      },
      ta: function(a, b) {
        return {
          x: a.x / b.x,
          y: a.y / b.y,
          z: a.z / b.z
        }
      },
      m: function(a, b) {
        return {
          x: a.x *
          b,
          y: a.y * b,
          z: a.z * b
        }
      },
      A: function(a, b) {
        return {
          x: a.x / b,
          y: a.y / b,
          z: a.z / b
        }
      },
      k: function(a) {
        return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z)
      },
      c: function(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z
      },
      Z: function(a, b) {
        return {
          x: a.y * b.z - a.z * b.y,
          y: a.z * b.x - a.x * b.z,
          z: a.x * b.y - a.y * b.x
        }
      },
      normalize: function(a) {
        return c.A(a, c.k(a))
      },
      oa: function(a, b) {
        return Math.acos(c.c(a, b) / (c.k(a) * c.k(b)))
      },
      t: function(a) {
        return {
          x: a.x,
          y: a.y,
          z: a.z
        }
      },
      ua: function(a, b) {
        return a.x === b.x && a.y === b.y && a.z === b.z
      }
    };

  var t = {
      K: function(a) {
        return 57.2957795 * a
      },
      w: function(a) {
        return .0174532925 *
          a
      },
      p: function(a, b) {
        var d = t.w(b.x / 2),
          n = t.w(b.y / 2),
          e = t.w(b.z / 2),
          c = Math.cos(d),
          h = Math.cos(n),
          f = Math.cos(e),
          d = Math.sin(d),
          n = Math.sin(n),
          g = Math.sin(e),
          e = c * h * f + -d * n * g,
          m = d * h * f - -c * n * g,
          k = c * n * f + d * h * -g,
          c = c * h * g - -d * n * f;
        return {
          x: a.x * (1 - 2 * (k * k + c * c)) + 2 * a.y * (m * k - c * e) + 2 * a.z * (m * c + k * e),
          y: 2 * a.x * (m * k + c * e) + a.y * (1 - 2 * (m * m + c * c)) + 2 * a.z * (k * c - m * e),
          z: 2 * a.x * (m * c - k * e) + 2 * a.y * (c * k + m * e) + a.z * (1 - 2 * (m * m + k * k))
        }
      },
      D: function(a, b) {
        var d = [];
        if (a instanceof G)
          for (var c = 0; c < a.i.length; c++) d = d.concat(t.D(a.i[c], b));
        else a instanceof b && d.push(a);
        return d
      },
      T: function(a, b, d, n) {
        d = c.sub(d, a);
        b = c.sub(b, a);
        var e = c.sub(n, a);
        a = c.c(d, d);
        n = c.c(d, b);
        d = c.c(d, e);
        var p = c.c(b, b);
        b = c.c(b, e);
        e = 1 / (a * p - n * n);
        p = (p * d - n * b) * e;
        a = (a * b - n * d) * e;
        return 0 <= p && 0 <= a && 1 > p + a
      },
      va: function(a, b, d, n, e) {
        var p = c.c(n, c.sub(b, a));
        return 0 < c.c(n, c.sub(e, d)) ? c.add(a, c.m(c.normalize(c.sub(b, a)), p)) : a
      },
      ba: function(a, b, d, n) {
        d = -c.c(n, d);
        d = c.c(n, a) + d;
        n = c.c(n, b);
        return 0 === n ? null : c.add(a, c.m(b, -(d / n)))
      },
      O: function(a, b, d, n) {
        var e = c.sub(d, a);
        d = c.sub(b, a);
        var p = c.k(d);
        d = c.normalize(d);
        e = c.c(d,
          e);
        if (0 > e) return n ? a : null;
        if (e > p) return n ? b : null;
        d = c.m(d, e);
        return c.add(a, d)
      },
      aa: function(a, b, d, n, e) {
        a = t.O(a, b, e, !0);
        d = t.O(b, d, e, !0);
        return c.add(b, c.add(c.sub(a, b), c.sub(d, b)))
      },
      Aa: function(a, b, d, c, e) {
        var p = Math.min(a.x, b.x, d.x, c.x),
          h = Math.max(a.x, b.x, d.x, c.x),
          f = Math.min(a.y, b.y, d.y, c.y),
          g = Math.max(a.y, b.y, d.y, c.y),
          m = Math.min(a.z, b.z, d.z, c.z);
        a = Math.max(a.z, b.z, d.z, c.z);
        return p > e.x && h < e.x || f > e.y && g < e.y || m > e.z && a < e.z
      },
      ka: function(a, b, d, c, e) {
        return t.T(a, b, d, e) || t.T(a, d, c, e)
      },
      N: function(a) {
        var b =
            new Q,
          d = t.D(a, x),
          n = t.D(a, q);
        t.D(a, P);
        n.forEach(function(a) {
          delete a.I;
          delete a.l;
          var d = a.ca(),
            b = c.sub(d[1], d[0]),
            n = c.sub(d[2], d[1]);
          a.f = d[0];
          a.a = d[1];
          a.g = d[2];
          a.h = d[3];
          a.S = c.normalize(c.Z(b, n));
          a.Q = d[4];
          a.R = d[5];
          a.ja = d[6];
          a.za = d[7];
          d = c.create(Math.min(a.f.x, a.a.x, a.g.x, a.h.x), Math.min(a.f.y, a.a.y, a.g.y, a.h.y), Math.min(a.f.z, a.a.z, a.g.z, a.h.z));
          b = c.create(Math.max(a.f.x, a.a.x, a.g.x, a.h.x), Math.max(a.f.y, a.a.y, a.g.y, a.h.y), Math.max(a.f.z, a.a.z, a.g.z, a.h.z));
          a.B = new O(d, b)
        });
        d.forEach(function(a) {
          for (var d =
            0, h = 0, f = 0, g = 0, m = 0, k = [], q, s = 100 + 10 * a.U, u = a.u(), r, l, v = c.create(a.color.G, a.color.F, a.color.a), I = n.filter(function(a) {
            var d = t.aa(a.f, a.a, a.g, a.h, u),
              b = c.sub(u, d),
              n = c.k(b);
            a.pa = d;
            a.sa = n;
            a.c = c.c(a.S, c.normalize(b));
            return n <= s
          }), K = 0; K < I.length; K++)
            if (r = I[K], k = null, r.la && (q = new O(r.B.min, r.B.max), q.da(u), k = I.filter(function(a) {
                return a !== r && a.X && (a.L || !0) && a.B.fa(q)
              })), 0 < r.c) {
              var A = Math.ceil(r.width / 8) + 1,
                x = Math.ceil(r.height / 8) + 1,
                G = c.A(c.sub(r.a, r.f), A),
                L = c.A(c.sub(r.g, r.a), x),
                M = c.A(c.sub(r.R, r.Q), A),
                N =
                  c.A(c.sub(r.R, r.ja), x);
              d++;
              r.l || (r.l = []);
              for (var y = 0; y < x; y++) {
                r.l[y] || (r.l[y] = []);
                for (var B = 0; B < A; B++) {
                  l = r.f;
                  l = c.add(l, c.m(G, B));
                  l = c.add(l, c.m(L, y));
                  var w = c.sub(u, l),
                    C = c.k(w),
                    z = c.normalize(w),
                    w = 255;
                  h++;
                  w = c.add(r.Q, c.add(c.m(N, y), c.m(M, B)));
                  w = Math.max(c.c(w, z), 0);
                  w = Math.max(0, 1 - C / s) * w * 255 * a.W;
                  if (k && C <= s)
                    for (b.position = c.add(l, c.m(z, 8)), b.$ = C - 8, b.direction = z, l = k.length, C = 0; C < l; C++)
                      if (z = k[C], b.ea(z.B))
                        if (f++, b.ga(z.f, z.a, z.g, z.h, z.S)) {
                          w = 0;
                          m++;
                          break
                        } else g++;
                  BG_BlendSupport ? r.l[y][B] = c.add(r.l[y][B] || c.create(), c.m(v,
                    w / 255)) : (w = Math.min(255, (r.l[y][B] || 0) + w), r.l[y][B] = w)
                }
              }
            }
        })
      }
    };

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
  M.prototype = {
    set: function(a, b, d) {
      1 == arguments.length ? this.set(a.x, a.y) : (this.x = a || 0, this.y = b || 0)
    }
  };
  var N = "#f00 #f80 #ff0 #8f0 #0f0 #0f8 #0ff #08f #00f #80f #f0f #f08".split(" "),
    T = 0,
    L = [];
  s.prototype = {
    update: function() {
      setTimeout(function(a) {
        a.e.style.cssText = a.j()
      }, 0, this);
      delete this.H
    },
    j: function() {
      return CssUtils.base() + CssUtils.translate(this.position.x, this.position.y, this.position.z, this.rotation.x, this.rotation.y, this.rotation.z, this.v.x, this.v.y)
    },
    clone: function() {
      return CssUtils.clone(this)
    },
    u: function() {
      if (this.H) return this.H;
      for (var a = this, b = c.create(0, 0, 0); a;) b = c.add(b, a.position), a = a.parent;
      return this.H = b
    }
  };
  G.prototype = {
    update: function(a) {
      s.prototype.update.call(this);
      if (a)
        for (a =
               0; a < this.i.length; a++) this.i[a].update(!0)
    },
    add: function(a, b, d, c, e, p, h, f, g) {
      a.parent && a.parent.remove(a);
      "undefined" != typeof b && (a.position.x = b);
      "undefined" != typeof d && (a.position.y = d);
      "undefined" != typeof c && (a.position.z = c);
      "undefined" != typeof e && (a.rotation.x = e);
      "undefined" != typeof p && (a.rotation.y = p);
      "undefined" != typeof h && (a.rotation.z = h);
      "undefined" != typeof f && (a.v.x = f);
      "undefined" != typeof g && (a.v.y = g);
      a.parent = this;
      this.i.push(a);
      this.e.appendChild(a.e);
      a instanceof x && L.push(a);
      return a
    },
    remove: function(a) {
      for (var b =
        0; b < this.i.length; b++)
        if (this.i[b] === a) return a.parent = null, a.e.parentNode.removeChild(a.e), this.i.splice(b, 1), a
    },
    clone: s.prototype.clone,
    j: s.prototype.j
  };
  x.prototype = {
    j: s.prototype.j,
    clone: s.prototype.clone,
    update: s.prototype.update,
    u: s.prototype.u
  };
  P.prototype = {
    j: function() {
      return "width:" + this.length.toFixed(2) + "px;height:1px;background:" + this.color + ";" + CssUtils.origin(0, 0, 0) + s.prototype.j.apply(this)
    },
    clone: s.prototype.clone,
    update: s.prototype.update,
    setStart: function(a) {
      this.position = c.create(a.x, a.y,
        a.z)
    },
    setEnd: function(a) {
      a = c.sub(a, this.position);
      this.length = c.k(a);
      this.rotation = c.create(0, t.K(-Math.atan2(a.z, a.x)), t.K(Math.asin(a.y / this.length)))
    }
  };
  O.prototype = {
    da: function(a) {
      this.min.x = Math.min(a.x, this.min.x);
      this.min.y = Math.min(a.y, this.min.y);
      this.min.z = Math.min(a.z, this.min.z);
      this.max.x = Math.max(a.x, this.max.x);
      this.max.y = Math.max(a.y, this.max.y);
      this.max.z = Math.max(a.z, this.max.z)
    },
    fa: function(a) {
      return this.max.x > a.min.x && this.min.x < a.max.x && this.max.y > a.min.y && this.min.y < a.max.y &&
        this.max.z > a.min.z && this.min.z < a.max.z
    }
  };
  Q.prototype = {
    ga: function(a, b, d, n, e) {
      if (e = t.ba(this.position, this.direction, a, e)) {
        var p = c.sub(e, this.position);
        if (0 < c.c(p, this.direction) && c.k(p) <= this.$ && t.ka(a, b, d, n, e)) return e
      }
      return null
    },
    ea: function(a) {
      var b = a.min,
        d = a.max,
        c = this.position,
        e = this.direction,
        p = (b.x - c.x) / e.x,
        h = (d.x - c.x) / e.x;
      p > h && (a = h, h = p, p = a);
      var f = (b.y - c.y) / e.y,
        g = (d.y - c.y) / e.y;
      f > g && (a = g, g = f, f = a);
      if (p > g || f > h) return !1;
      f > p && (p = f);
      g < h && (h = g);
      b = (b.z - c.z) / e.z;
      d = (d.z - c.z) / e.z;
      b > d && (a = d, d = b, b = a);
      return p > d || b > h ? !1 : !0
    }
  };
  q.prototype = {
    j: function() {
      return CssUtils.size(this.width, this.height) + CssUtils.V(this.L) + CssUtils.n(this) + s.prototype.j.apply(this)
    },
    ca: function() {
      if (this.I) return this.I;
      var a, b;
      a = this.width / 2 | 0;
      b = this.height / 2 | 0;
      for (var d = Math.tan(t.w(this.v.x)), n = Math.tan(t.w(this.v.y)), e = c.create(-a - b * d, -b - a * n, 0), p = c.create(+a - b * d, -b + a * n, 0), h = c.create(+a + b * d, +b + a * n, 0), d = c.create(-a + b * d, +b - a * n, 0), n = this, f = c.t(this.q.f), g = c.t(this.q.a), m = c.t(this.q.g), k = c.t(this.q.h); n;) a = n.rotation, b = n.position, e = c.add(t.p(e,
        a), b), p = c.add(t.p(p, a), b), h = c.add(t.p(h, a), b), d = c.add(t.p(d, a), b), f = t.p(f, a), g = t.p(g, a), m = t.p(m, a), k = t.p(k, a), n = n.parent;
      this.I = [e, p, h, d];
      return [e, p, h, d, f, g, m, k]
    },
    clone: s.prototype.clone,
    update: s.prototype.update,
    u: s.prototype.u
  };
  v.prototype = G.prototype;
  R.prototype = {
    ma: function(a) {
      this.perspective = a;
      this.e.style.cssText = CssUtils.perspective(a)
    },
    update: function() {
      this.C.style.cssText = CssUtils.base() + CssUtils.translate(0, 0, this.perspective, this.o.rotation.x, this.o.rotation.y, this.o.rotation.z);
      this.r.e.style.cssText = CssUtils.base() +
      CssUtils.translate(this.o.position.x, this.o.position.y, this.o.position.z, 0, 0, 0)
    }
  };
  var V = function() {
    var canvas = document.createElement("canvas"),
      b = canvas.getContext("2d");
    return function(d) {
      d || (d = [
        [0]
      ]);
      var c = d.length,
        e = d[0].length,
        p = b.createImageData(e, c);
      canvas.height = p.height;
      canvas.width = p.width;
      var h = p.data,
        f = 0;
      if (BG_BlendSupport)
        for (var g = 0; g < c; g++)
          for (var m = 0; m < e; m++) {
            var k = d[g][m];
            10 < c && 10 < e && (0 < g && (d[g - 1][m].x < k.x + 10 && (k.x = d[g - 1][m].x / 2 + k.x / 2), d[g - 1][m].y < k.y + 10 && (k.y = d[g - 1][m].y / 2 + k.y / 2), d[g - 1][m].z < k.z + 10 && (k.z = d[g - 1][m].z / 2 + k.z /
            2)), g < c - 1 && (d[g + 1][m].x < k.x + 10 && (k.x = d[g + 1][m].x / 2 + k.x / 2), d[g + 1][m].y < k.y + 10 && (k.y = d[g + 1][m].y / 2 + k.y / 2), d[g + 1][m].z < k.z + 10 && (k.z = d[g + 1][m].z / 2 + k.z / 2)), 0 < m && (d[g][m - 1].x < k.x + 10 && (k.x = d[g][m - 1].x / 2 + k.x / 2), d[g][m - 1].y < k.y + 10 && (k.y = d[g][m - 1].y / 2 + k.y / 2), d[g][m - 1].z < k.z + 10 && (k.z = d[g][m - 1].z / 2 + k.z / 2)), m < e - 1 && (d[g][m + 1].x < k.x + 10 && (k.x = d[g][m + 1].x / 2 + k.x / 2), d[g][m + 1].y < k.y + 10 && (k.y = d[g][m + 1].y / 2 + k.y / 2), d[g][m + 1].z < k.z + 10 && (k.z = d[g][m + 1].z / 2 + k.z / 2)));
            h[f + 0] = k.x | 0;
            h[f + 1] = k.y | 0;
            h[f + 2] = k.z | 0;
            h[f + 3] = 255;
            f += 4
          } else
        for (g =
               0; g < c; g++)
          for (m = 0; m < e; m++) k = d[g][m], 10 < c && 10 < e && (0 < g && d[g - 1][m] < k + 10 && (k = d[g - 1][m] / 2 + k / 2), g < c - 1 && d[g + 1][m] < k + 10 && (k = d[g + 1][m] / 2 + k / 2), 0 < m && d[g][m - 1] < k + 10 && (k = d[g][m - 1] / 2 + k / 2), m < e - 1 && d[g][m + 1] < k + 10 && (k = d[g][m + 1] / 2 + k / 2)), h[f + 3] = Math.min(230, 255 - k) | 0, f += 4;
      b.putImageData(p, 0, 0);
      return BG_BlendSupport ? canvas.toDataURL("image/jpeg", .9) : canvas.toDataURL()
    }
  }();
  S.prototype = {
    ha: function(a, b) {
      var d = this,
        c = new Image;
      d.ready = !1;
      c.onload = function() {
        var a = c.width,
          p = c.height;
        d.ready = !0;
        d.canvas.width = a;
        d.canvas.height = p;
        d.M.drawImage(c,
          0, 0);
        b && b()
      };
      c.src = a
    },
    P: function(a, b) {
      var d;
      return this.ready ? (b = 58 - (b /= 12) | 0, a = 92 + (a /= 12) | 0, d = this.M.getImageData(b, a, 1, 1), 25 * (255 - d.data[0])) : 0
    }
  };
  (function() {
    for (var a = 0, b = ["ms", "moz", "webkit", "o"], d = 0; d < b.length && !window.requestAnimationFrame; ++d) window.requestAnimationFrame = window[b[d] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[d] + "CancelAnimationFrame"] || window[b[d] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(b) {
      var d =
          (new Date).getTime(),
        c = Math.max(0, 16 - (d - a)),
        h = window.setTimeout(function() {
          b(d + c)
        }, c);
      a = d + c;
      return h
    });
    window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
      clearTimeout(a)
    })
  })();
  window.onload = function() {
    var a, b, d, n, e;

    function p(c) {
      var f = "keydown" == c.type;
      switch (c.keyCode) {
        case 87:
          a = f;
          break;
        case 83:
          b = f;
          break;
        case 65:
          d = f;
          break;
        case 68:
          n = f;
          break;
        case 32:
          e = f
      }
    }

    function h(c) {
      c = c - v || 0;
      requestAnimationFrame(h);
      n ? l.b = Math.min(l.b + .2, 5) : d ? l.b = Math.max(l.b - .2, -5) : 0 < l.b ? l.b = Math.max(l.b - .2, 0) :
      0 > l.b && (l.b = Math.min(l.b + .2, 0));
      l.d = a ? Math.min(l.d + .2, 5) : b ? Math.max(l.d - .2, -5) : 0 < l.d ? Math.max(l.d - .2, 0) : 0 > l.d ? Math.min(l.d + .2, 0) : 0;
      var f = .0174532925 * u.o.rotation.y,
        g = l.position.x - Math.sin(f) * l.d - Math.cos(f) * l.b,
        f = l.position.z + Math.cos(f) * l.d - Math.sin(f) * l.b,
        p = k.P(g, f);
      0 !== l.d || 0 !== l.b || 0 !== l.s ? (s && (s = clearTimeout(s)), q && (m.className = "hide", q = !1)) : s || (s = setTimeout(function() {
        m.className = "";
        q = !0
      }, 4E3));
      60 < p - l.position.y ? (l.d = 0, l.b = 0) : (l.position.x = g, l.position.z = f);
      g = k.P(l.position.x, l.position.z);
      l.position.y > g ? l.position.y < g + 9 ? (l.position.y = g, l.b /= 1.3, l.d /= 1.3) : l.s = Math.min(40, Math.max(-12, l.s + .75)) : l.position.y > g - 9 ? l.position.y = g : (l.s = -5, l.d /= 1.1, l.b /= 1.1);
      l.position.y === g && (l.s = 0, e && (l.s = -12));
      g = Math.cos(c / 250) * l.d / 10;
      c = Math.sin(c / 500) * l.d / 2 / 10;
      l.position.y -= l.s;
      r.rotation = l.rotation;
      r.rotation.x += g;
      r.rotation.y += c;
      r.position.x = l.position.x;
      r.position.y = l.position.y + 275;
      r.position.z = l.position.z;
      u.update();
      r.rotation.x -= g;
      r.rotation.y -= c
    }
    var f = document.getElementById("loading"),
      g = document.getElementById("viewport"),
      m = document.getElementById("instructions"),
      k = new S,
      q = !0,
      s;
    f.style.display = "none";
    window.ra && (debugUI.onchange = function() {
      t.N(u.r, !1);
      u.r.update(!0)
    });
    var u = new R(g),
      r = u.o,
      l = {
        position: c.create(-1E3, 500, -1050),
        rotation: c.create(0, 270, 0),
        d: 0,
        s: 0,
        b: 0
      };
    U(u.r);
    e = n = d = b = a = !1;
    k.ha("../map.png", function() {
      var a;
      m.className = "";
      g.className = "";
      q = !0;
      document.addEventListener("mousemove", function(b) {
        !b.altKey && a && (l.rotation.x -= (b.pageY - a.y) / 2, l.rotation.y += (b.pageX - a.x) / 2, l.rotation.x = Math.max(Math.min(l.rotation.x,
          90), -90));
        a = {
          x: b.pageX,
          y: b.pageY
        }
      }, !1);
      h()
    });
    document.addEventListener("keydown", p, !1);
    document.addEventListener("keyup", p, !1);
    t.N(u.r);
    u.r.update(!0);
    var v = new Date
  }
})();
