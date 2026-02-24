import Shape from "./Shape";

export default class Ellipse extends Shape {
  constructor(x, y, rx, ry, style) {
    super(style);
    this.x = x;
    this.y = y;
    this.rx = rx;
    this.ry = ry;
  }

  draw(ctx) {
    this.applyStyle(ctx);
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.rx, this.ry, 0, 0, 2 * Math.PI);
    if (this.fill) ctx.fill();
    ctx.stroke();

    this.drawBoundingBox(ctx, this.getBoundingBox());
  }

  getBoundingBox() {
    return {
      x: this.x - this.rx,
      y: this.y - this.ry,
      width: this.rx * 2,
      height: this.ry * 2,
    };
  }

  isHit(x, y) {
    return (
      Math.pow((x - this.x) / this.rx, 2) +
        Math.pow((y - this.y) / this.ry, 2) <=
      1
    );
  }

  scale(factor) {
    this.rx *= factor;
    this.ry *= factor;
  }
}
