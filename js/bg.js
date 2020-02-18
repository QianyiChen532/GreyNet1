//audio
let audio1 = new Audio('audio/after you1.mp3');
let audio2 = new Audio('audio/Fading Sun.mp3');

function fly(){
  audio1.play();
  console.log(audio1.play());
  this.timer = 900;
  check=false;
  setTimeout(function(){ window.location.href="flow.html";}, 8000);
}



Object.getOwnPropertyNames(Math).map(function(p) {
  window[p] = Math[p];
});

var HEX_CRAD = 40,
HEX_GAP = 5,

unit_x = 3*HEX_CRAD + HEX_GAP*sqrt(3),
unit_y = HEX_CRAD*sqrt(3)*.5 + .5*HEX_GAP,
off_x = 1.5*HEX_CRAD + HEX_GAP*sqrt(3)*.5,

c = document.querySelectorAll('canvas'),
n = c.length, w, h, _min,
ctx = [],
grid, source = null,
request_id = null;


var GridItem = function(x, y) {
  this.x = x || 0;
  this.y = y || 0;
  this.points = { 'hex': [], 'hl': [] };

  this.init = function() {
    var x, y, a, ba = PI/3,
    ri = HEX_CRAD;

    for(var i = 0; i < 6; i++) {
      a = i*ba;
      x = this.x + HEX_CRAD*cos(a);
      y = this.y + HEX_CRAD*sin(a);

      this.points.hex.push({
        'x': x,
        'y': y
      });

      if(i > 2) {
        x = this.x + ri*cos(a);
        y = this.y + ri*sin(a);

        this.points.hl.push({
          'x': x,
          'y': y
        });
      }
    }
  };

  this.draw  = function(ct) {
    for(var i = 0; i < 6; i++) {
      ct[(i === 0?'move':'line')+ 'To'](
        this.points.hex[i].x,
        this.points.hex[i].y
      );
    }
  };

  this.highlight = function(ct) {
    for(var i = 0; i < 3; i++) {
      ct[(i === 0?'move':'line')+ 'To'](
        this.points.hl[i].x,
        this.points.hl[i].y
      );
    }
  };

  this.init();
};

var Grid = function(rows, cols) {
  this.cols = cols || 16;
  this.rows = rows || 16;
  this.items = [];
  this.n = this.items.length;

  this.init = function() {
    var x, y;

    for(var row = 0; row < this.rows; row++) {
      y = row*unit_y;

      for(var col = 0; col < this.cols; col++) {
        x = ((row%2 == 0)?0:off_x) + col*unit_x;

        this.items.push(new GridItem(x, y));
      }
    }

    this.n = this.items.length;
  };

  this.draw = function(ct) {
    ct.beginPath();

    for(var i = 0; i < this.n; i++) {
      this.items[i].draw(ct);
    }

    ct.closePath();
    ct.fill();
  };

  this.init();
};

var init = function() {
  var s = getComputedStyle(c[0]),
  rows, cols;

  w = ~~s.width.split('px')[0];
  h = ~~s.height.split('px')[0];
  _min = .75*min(w, h);

  rows = ~~(h/unit_y) + 2;
  cols = ~~(w/unit_x) + 2;

  for(var i = 0; i < n; i++) {
    c[i].width = w;
    c[i].height = h;
    ctx[i] = c[i].getContext('2d');
  }

  grid = new Grid(rows, cols);
  grid.draw(ctx[1]);

  if(!source) {
    source = { 'x': ~~(w/2), 'y': ~~(h/2) };
  }

  neon();
};

var neon = function() {
  stp = 0.6 ;
  var rgb = 'rgb( 255,255,255)',
  light = ctx[0].createRadialGradient(
    source.x, source.y, 0,
    source.x, source.y, .875*_min
  ), stp;


  light.addColorStop(0, rgb);
  light.addColorStop(stp, 'rgba(0,0,0,.05)');

  fillBackground('rgba(0,0,0,.08)');
  fillBackground(light);

  request_id = requestAnimationFrame(neon);
};

var fillBackground = function(bg_fill) {
  ctx[0].fillStyle = bg_fill;
  ctx[0].beginPath();
  ctx[0].rect(0, 0, w, h);
  ctx[0].closePath();
  ctx[0].fill();

};

var canvas = document.createElement("canvas");
canvas.width = 500;
canvas.height = 250;

init();
addEventListener('mousemove', function(e) {
  source = { 'x': e.clientX, 'y': e.clientY };
}, false);
