class Shape {

    constructor(x, y, distX, distY, length, pct) {

        this.x = x;
        this.y = y;

        this.distX = distX;
        this.distY = distY;
        this.len  = length;
        this.last = Date.now() + this.len * pct; 
        this.direction  = true;

    }

    hover() {

        if (Date.now() > this.last+this.len) {
            this.direction = !this.direction;
            this.last = Date.now();
        }

        if (this.direction) {
            this.pct = this.smoothStep(this.last, Date.now(), this.len);
        } else {
            this.pct = 1 - this.smoothStep(this.last, Date.now(), this.len);
        }

    }

    smoothStep(start, now, length) {
        var dt = (now - start) / length
        return dt * dt * (3 - 2 * dt);
    }

    update() {

        this.hover();

    }

    draw(ctx, width, height) {

        var gap = 60;
        var seg = 20;

        // Relative
        var xR = this.x*width  + this.distX*this.pct*width;
        var yR = this.y + this.distY*this.pct;

        this.contents(ctx, xR, yR, seg, gap);
        this.update();

    }

}

class Triangle extends Shape {

    constructor(x, y, distX, distY, length, pct) {
        super(x, y, distX, distY, length, pct);
    }

    contents(ctx, x, y, seg, gap) {

        x -= gap/2;
        y += seg*3/2;

        var h  = (gap+seg)/2*Math.sqrt(3);
        var hs = seg/2*Math.sqrt(3);

        ctx.fillStyle = "#E2E2E2";
        ctx.beginPath();
        ctx.moveTo(x,             y);
        ctx.lineTo(x+gap,         y);
        ctx.lineTo(x+gap+seg/2,   y-hs);
        ctx.lineTo(x+gap/2+seg/2, y-h);
        ctx.lineTo(x+gap/2-seg/2, y-h);
        ctx.lineTo(x-seg/2,       y-hs);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#E2E2E2";
        ctx.beginPath();
        ctx.arc(x-seg/8, y-seg/2, seg/2, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#E2E2E2";
        ctx.beginPath();
        ctx.arc(x+gap+seg/8, y-seg/2, seg/2, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#E2E2E2";
        ctx.beginPath();
        ctx.arc(x+gap/2, y-h+seg/8, seg/2, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }

}

class Square extends Shape {

    constructor(x, y, distX, distY, length, pct) {
        super(x, y, distX, distY, length, pct);
    }

    contents(ctx, x, y, seg, gap) {

        gap -= seg;

        ctx.fillStyle = "#E2E2E2";
        ctx.beginPath();
        ctx.moveTo(x,         y);
        ctx.lineTo(x+gap,     y);
        ctx.lineTo(x+gap+seg, y-seg);
        ctx.lineTo(x+gap+seg, y-gap-seg);
        ctx.lineTo(x+gap,     y-gap-seg*2);
        ctx.lineTo(x,         y-gap-seg*2);
        ctx.lineTo(x-seg,     y-gap-seg);
        ctx.lineTo(x-seg,     y-seg);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y-seg, seg, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y-seg-gap, seg, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x+gap, y-seg-gap, seg, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x+gap, y-seg, seg, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();

    }

}

class Circle extends Shape {

    constructor(x, y, distX, distY, length, pct) {
        super(x, y, distX, distY, length, pct);
    }

    contents(ctx, x, y, seg, gap) {

        ctx.fillStyle = "#E2E2E2";
        ctx.beginPath();
        ctx.arc(x, y, gap/2+seg/2, 0, Math.PI*2); 
        ctx.closePath();
        ctx.fill();

    }

}
