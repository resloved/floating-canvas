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
    shapes.push(new Triangle(0.2*i-0.025, 0.5, 0, 0.2, 5000, 0.5));
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
