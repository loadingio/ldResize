// Generated by LiveScript 1.3.1
var slice$ = [].slice;
(function(){
  var svg, cs, deg, ldResize;
  svg = 'http://www.w3.org/2000/svg';
  cs = ['#ff0', '#0ff', '#f0f', '#fff'];
  deg = function(v){
    return 180 * v / Math.PI;
  };
  ldResize = function(opt){
    var host, dim, ns, nr, ng, nb, draw, mouse, this$ = this;
    opt == null && (opt = {});
    import$(this, {
      opt: opt,
      evtHandler: {},
      host: host = typeof opt.host === 'string'
        ? document.querySelector(opt.host)
        : opt.host,
      dim: dim = {
        box: null,
        x: 100,
        y: 100,
        w: 100,
        h: 100,
        t: {
          x: 0,
          y: 0
        },
        s: {
          x: 0,
          y: 0
        },
        r: 0
      }
    });
    this.n = {
      s: ns = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function(d, i){
        var x$, n;
        x$ = n = document.createElementNS(svg, 'rect');
        x$.classList.add('ctrl', 's');
        x$.setAttribute('data-nx', i % 3);
        x$.setAttribute('data-ny', Math.floor(i / 3));
        return x$;
      }),
      r: nr = [0, 1, 2, 3].map(function(d, i){
        var x$, n;
        x$ = n = document.createElementNS(svg, 'rect');
        x$.classList.add('ctrl', 'r');
        x$.setAttribute('data-nx', 2 * (i % 2));
        x$.setAttribute('data-ny', 2 * Math.floor(i / 2));
        x$.setAttribute('fill', cs[i]);
        return x$;
      }),
      g: ng = document.createElementNS(svg, 'g')
    };
    this.n.b = nb = document.createElementNS(svg, 'rect');
    nb.classList.add('range');
    ng.appendChild(nb);
    nr.map(function(it){
      return ng.appendChild(it);
    });
    ns.map(function(it){
      return ng.appendChild(it);
    });
    host.appendChild(ng);
    this.draw = draw = function(){
      var ref$, s, r, sw, sh, h, i$, y, j$, x, box, cx, cy, a, b, c, d, e, f;
      ref$ = [8, 2, dim.w / 2, dim.h / 2], s = ref$[0], r = ref$[1], sw = ref$[2], sh = ref$[3];
      h = s / 2;
      [['x', -dim.w / 2], ['y', -dim.h / 2], ['width', dim.w], ['height', dim.h]].map(function(it){
        return nb.setAttribute(it[0], it[1]);
      });
      ng.setAttribute('transform', "translate(" + (dim.x + dim.w / 2) + ", " + (dim.y + dim.h / 2) + ") rotate(" + deg(dim.r || 0) + ")");
      for (i$ = 0; i$ <= 2; ++i$) {
        y = i$;
        for (j$ = 0; j$ <= 2; ++j$) {
          x = j$;
          if ((x === 1 || y === 1) && !(x === 1 && y === 1)) {
            continue;
          }
          [['x', -dim.w / 2 - h + x * sw], ['y', -dim.h / 2 - h + y * sh], ['width', s], ['height', s]].map(fn$);
        }
      }
      for (i$ = 0; i$ <= 1; ++i$) {
        y = i$;
        for (j$ = 0; j$ <= 1; ++j$) {
          x = j$;
          [['x', -dim.w / 2 - h * r + x * dim.w + (2 * x - 1) * h], ['y', -dim.h / 2 - h * r + y * dim.h + (2 * y - 1) * h], ['width', s * r], ['height', s * r]].map(fn1$);
        }
      }
      box = dim.box;
      dim.s.x = dim.w / box.w;
      dim.s.y = dim.h / box.h;
      dim.t.x = dim.x - box.x - (box.w / 2) * (1 - dim.s.x);
      dim.t.y = dim.y - box.y - (box.h / 2) * (1 - dim.s.y);
      ref$ = [box.x + box.w / 2, box.y + box.h / 2], cx = ref$[0], cy = ref$[1];
      a = dim.s.x * Math.cos(dim.r);
      b = dim.s.x * Math.sin(dim.r);
      c = -dim.s.y * Math.sin(dim.r);
      d = dim.s.y * Math.cos(dim.r);
      e = -dim.s.x * cx * Math.cos(dim.r) + dim.s.y * cy * Math.sin(dim.r) + cx + dim.t.x;
      f = -dim.s.x * cx * Math.sin(dim.r) - dim.s.y * cy * Math.cos(dim.r) + cy + dim.t.y;
      return this$.tgt.setAttribute('transform', "matrix(" + a + " " + b + " " + c + " " + d + " " + e + " " + f + ")");
      function fn$(it){
        return ns[y * 3 + x].setAttribute(it[0], it[1]);
      }
      function fn1$(it){
        return nr[y * 2 + x].setAttribute(it[0], it[1]);
      }
    };
    mouse = {
      up: function(e){
        return [['mouseup', mouse.p], ['mousemove', mouse.move]].map(function(it){
          return document.removeEventListener(it[0], it[1]);
        });
      },
      down: function(e){
        var n, ref$, nx, ny;
        if (!((n = e.target) && e.target.classList)) {
          return;
        }
        document.addEventListener('mouseup', mouse.up);
        document.addEventListener('mousemove', mouse.move);
        ref$ = ['data-nx', 'data-ny'].map(function(k){
          return +n.getAttribute(k);
        }), nx = ref$[0], ny = ref$[1];
        return import$(mouse, {
          ix: e.clientX,
          iy: e.clientY,
          nx: nx,
          ny: ny,
          n: n
        });
      },
      move: function(e){
        var ref$, cx, cy, nx, ny, box, p2, v, len, a, p2p, na, p1, p1p, cp;
        ref$ = [e.clientX, e.clientY, mouse.nx, mouse.ny], cx = ref$[0], cy = ref$[1], nx = ref$[2], ny = ref$[3];
        box = host.getBoundingClientRect();
        if (nx === 1 && ny === 1) {
          ref$ = [dim.x + cx - mouse.ix, dim.y + cy - mouse.iy], dim.x = ref$[0], dim.y = ref$[1];
          mouse.ix = cx;
          mouse.iy = cy;
          return draw();
        }
        if (mouse.n.classList.contains('r')) {
          p2 = [dim.x + dim.w * nx / 2, dim.y + dim.h * ny / 2];
          v = [p2[0] - dim.x - dim.w / 2, p2[1] - dim.y - dim.h / 2];
          len = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
          a = Math.acos(v[0] / len);
          if (v[1] < 0) {
            a = 2 * Math.PI - a;
          }
          a += dim.r;
          p2p = [cx - box.x, cy - box.y];
          v = [p2p[0] - dim.x - dim.w / 2, p2p[1] - dim.y - dim.h / 2];
          len = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
          na = Math.acos(v[0] / len);
          if (v[1] < 0) {
            na = 2 * Math.PI - na;
          }
          dim.r = dim.r + (na - a);
          return draw();
        }
        if (mouse.n.classList.contains('s')) {
          p1 = [dim.x + dim.w * (2 - nx) / 2, dim.y + dim.h * (2 - ny) / 2];
          p2 = [dim.x + dim.w * nx / 2, dim.y + dim.h * ny / 2];
          v = [dim.w * (1 - nx) / 2, dim.h * (1 - ny) / 2];
          len = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
          a = Math.acos(v[0] / len);
          if (v[1] < 0) {
            a = 2 * Math.PI - a;
          }
          a += dim.r;
          p1p = [dim.x + dim.w / 2 + len * Math.cos(a), dim.y + dim.h / 2 + len * Math.sin(a)];
          p2p = [cx - box.x, cy - box.y];
          cp = [(p1p[0] + p2p[0]) / 2, (p1p[1] + p2p[1]) / 2];
          v = [p2p[0] - cp[0], p2p[1] - cp[1]];
          len = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
          a = Math.acos(v[0] / len);
          if (v[1] < 0) {
            a = 2 * Math.PI - a;
          }
          a -= dim.r;
          p2 = [cp[0] + len * Math.cos(a), cp[1] + len * Math.sin(a)];
          v = [p1p[0] - cp[0], p1p[1] - cp[1]];
          len = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
          a = Math.acos(v[0] / len);
          if (v[1] < 0) {
            a = 2 * Math.PI - a;
          }
          a -= dim.r;
          p1 = [cp[0] + len * Math.cos(a), cp[1] + len * Math.sin(a)];
          if (nx === 0) {
            ref$ = [(ref$ = p1[0] - p2[0]) > 0 ? ref$ : 0, p2[0]], dim.w = ref$[0], dim.x = ref$[1];
          }
          if (ny === 0) {
            ref$ = [(ref$ = p1[1] - p2[1]) > 0 ? ref$ : 0, p2[1]], dim.h = ref$[0], dim.y = ref$[1];
          }
          if (nx === 2) {
            ref$ = [(ref$ = p2[0] - p1[0]) > 0 ? ref$ : 0, p1[0]], dim.w = ref$[0], dim.x = ref$[1];
          }
          if (ny === 2) {
            ref$ = [(ref$ = p2[1] - p1[1]) > 0 ? ref$ : 0, p1[1]], dim.h = ref$[0], dim.y = ref$[1];
          }
          return draw();
        }
      }
    };
    host.addEventListener('mousedown', mouse.down);
    return this;
  };
  ldResize.prototype = import$(Object.create(Object.prototype), {
    on: function(n, cb){
      var ref$;
      return ((ref$ = this.evtHandler)[n] || (ref$[n] = [])).push(cb);
    },
    fire: function(n){
      var v, i$, ref$, len$, cb, results$ = [];
      v = slice$.call(arguments, 1);
      for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    },
    attach: function(n){
      var ref$, d, nAlt, b, rb, box, cx, cy, t, m;
      ref$ = [n, this.dim], this.tgt = ref$[0], d = ref$[1];
      nAlt = n.cloneNode(true);
      nAlt.setAttribute('transform', '');
      document.querySelector('#svg').appendChild(nAlt);
      b = nAlt.getBoundingClientRect();
      nAlt.parentNode.removeChild(nAlt);
      rb = this.host.getBoundingClientRect();
      d.box = box = {
        x: b.x - rb.x,
        y: b.y - rb.y,
        w: b.width,
        h: b.height
      };
      ref$ = [box.x + box.w / 2, box.y + box.h / 2], cx = ref$[0], cy = ref$[1];
      t = n.getAttribute('transform') || getComputedStyle(n).transform;
      m = n.transform.baseVal.consolidate().matrix;
      ref$ = d.s;
      ref$.x = Math.sqrt(Math.pow(m.a, 2) + Math.pow(m.b, 2));
      ref$.y = Math.sqrt(Math.pow(m.c, 2) + Math.pow(m.d, 2));
      d.r = Math.acos(m.a / d.s.x);
      import$(d.t, {
        x: m.e + d.s.x * cx * Math.cos(d.r) - d.s.y * cy * Math.sin(d.r) - cx,
        y: m.f + d.s.x * cx * Math.sin(d.r) + d.s.y * cy * Math.cos(d.r) - cy
      });
      import$(this.dim, {
        x: box.x + (box.w / 2) * (1 - this.dim.s.x) + this.dim.t.x,
        y: box.y + (box.h / 2) * (1 - this.dim.s.y) + this.dim.t.y,
        w: box.w * this.dim.s.x,
        h: box.h * this.dim.s.y
      });
      return this.draw();
    },
    dim: function(){
      return this.dim;
    },
    detach: function(){}
  });
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ldResize;
  }
  if (window) {
    return window.ldResize = ldResize;
  }
})();
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}