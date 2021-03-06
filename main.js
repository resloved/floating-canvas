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
    shapes.push(new Triangle(0.2*i, 100, 0, 100, 5000, 1/amt*i+0.8));
}

shapes.push(new Square(0.4, 300, 0, 200, 7000, 0));
shapes.push(new Circle(0.8, 200, 0, 300, 3000, 0));

setup();

function setup() {
    window.addEventListener('resize', resize, false);
    resize();
}

function draw() {
    var width  = canvas.width;
    var height = canvas.height;
    context.clearRect(0, 0, width, height);
    for (var i = 0; i < shapes.length; i++) {
        shapes[i].draw(context, width, height);
    }
    requestAnimationFrame(draw);
}

function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}

draw();
