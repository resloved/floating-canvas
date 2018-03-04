// == Classes ==

class Shape {

    constructor(x, y, distX, distY, length) {
        this.x = x;
        this.y = y;

        this.distX = distX;
        this.distY = distY;

        this.direction = true;

        this.len = length;
        this.pct = 0
        this.last = Date.now(); 
    }

    update() {
        // Delta
        var dt = Date.now() - this.last;
        if (this.direction) {
            this.pct = dt / this.len; 
        } else {
            this.pct = 1 - dt / this.len; 
        }

        // Edge Check
        if (this.pct >= 1 || this.pct <= 0) {
            this.direction = !this.direction;
            this.pct = 0;
            this.last = Date.now();
        }
    }

}

class Triangle extends Shape {

    constructor(x, y, distX, distY, length) {
        super(x, y, distX, distY, length);
    }

    draw(ctx, width, height) {

        // Relative
        var xR = this.x*width  + this.distX*this.pct*width;
        var yR = this.y*height + this.distY*this.pct*height;

        // Shape
        ctx.fillStyle = "#CCCCCC";
        ctx.beginPath();
        ctx.moveTo(xR, yR);
        ctx.lineTo(xR + 50, yR);
        ctx.lineTo(xR + 25, yR - 45);
        ctx.fill();

        this.update();

    }
}

// == Canvas ==

var canvas  = document.getElementById("floating");
var context = canvas.getContext("2d");

// Browser compatibility
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
 
var shapes = new Array();
var amt = 4;
for (var i = 1; i <= amt; i++) {
    shapes.push(new Triangle(0.2*i, 0.2, 0, 0.1, 5000));
}

setup();

function setup() {
    window.addEventListener('resize', resize, false);
    resize();
}

function draw() {
    var width  = canvas.width;
    var height = canvas.height;
    context.clearRect(0, 0, width, height);
    for (var i = 0; i < 4; i++) {
        shapes[i].draw(context, width, height);
    }

    requestAnimationFrame(draw);
}

function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}

draw();
