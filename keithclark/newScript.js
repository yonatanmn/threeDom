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
  var J = !0,
    c = {
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
    },
    t = {
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
                  J ? r.l[y][B] = c.add(r.l[y][B] || c.create(), c.m(v,
                    w / 255)) : (w = Math.min(255, (r.l[y][B] || 0) + w), r.l[y][B] = w)
                }
              }
            }
        })
      }
    },
    u = function() {
      var a = document.documentElement.style,
        b = void 0 !== a.WebkitTransform && "-webkit-" || void 0 !== a.MozTransform && "-moz-" || void 0 !== a.transform && "";
      J &= void 0 !== a.backgroundBlendMode;
      return {
        J: function() {
          return "position: absolute;left:50%;top:50%;" + b + "transform-style:preserve-3d;"
        },
        size: function(a, b) {
          return "width:" + a.toFixed(2) + "px;height:" + b.toFixed(2) + "px;margin-left:" + -(a / 2).toFixed(2) + "px;margin-top:" + -(b / 2).toFixed(2) + "px;"
        },
        translate: function(a,
                            c, e, p, h, f, g, m) {
          return b + "transform:translate3d(" + a.toFixed(2) + "px," + c.toFixed(2) + "px," + e.toFixed(2) + "px)rotateX(" + p.toFixed(2) + "deg)rotateY(" + h.toFixed(2) + "deg)rotateZ(" + f.toFixed(2) + "deg)skewX(" + (g || 0) + "deg)skewY(" + (m || 0) + "deg);"
        },
        origin: function(a, c, e) {
          return b + "transform-origin:" + a.toFixed(2) + "px " + c.toFixed(2) + "px " + e.toFixed(2) + "px;"
        },
        V: function(a) {
          return a ? "" : b + "backface-visibility:hidden;"
        },
        perspective: function(a) {
          return b + "perspective:" + a + "px;"
        },
        wa: function(a) {
          for (var b = 0, e = 0; e < L.length; e++) var p =
              L[e],
            …
