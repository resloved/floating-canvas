class Shape {

    constructor(x, y, distX, distY, length, pct) {

        this.x = x;
        this.y = y;

        this.distX = distX;
        this.distY = distY;

        this.direction = true;

        this.len = length;
        this.pct = pct;
        this.last = Date.now(); 

    }

    update() {

        if (Date.now() > this.last+this.len) {
            this.direction = !this.direction;
            this.last = Date.now();
        }

        var dt = (Date.now() - this.last) / this.len;
        if (this.direction) {
            this.pct = dt * dt * (3 - 2 * dt);
        } else {
            this.pct = 1 - dt * dt * (3 - 2 * dt);
        }

    }

}

class Triangle extends Shape {

    constructor(x, y, distX, distY, length, pct) {
        super(x, y, distX, distY, length, pct);
    }

    draw(ctx, width, height) {

        var seg = 20;
        var gap = 50;

        // Relative
        var xR = this.x*width  + this.distX*this.pct*width;
        var yR = this.y*height + this.distY*this.pct*height;

        // Shape
        ctx.fillStyle = "#E2E2E2";
        ctx.beginPath();
        ctx.moveTo(xR,             yR);
        ctx.lineTo(xR+gap,         yR);
        ctx.lineTo(xR+gap+seg/2,   yR-seg);
        ctx.lineTo(xR+gap/2+seg/2, yR-gap-seg);
        ctx.lineTo(xR+gap/2-seg/2, yR-gap-seg);
        ctx.lineTo(xR-seg/2,       yR-seg);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(xR-seg/4+4, yR-seg/2-2, seg/2+2, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(xR+gap+1, yR-seg/2-2, seg/2+2, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(xR+gap/2, yR-gap-seg+8, seg/2+2, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();

        this.update();

    }
}
