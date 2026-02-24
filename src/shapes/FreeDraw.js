import Shape from "./Shape";

export default class FreeDraw extends Shape {
  constructor(points, style, fillShape = false) {
    super({ ...style });
    this.points = points;
    this.closed = fillShape; // only close if explicitly a fillable shape
  }

  draw(ctx) {
    if (this.points.length === 0) return;

    this.applyStyle(ctx);
    ctx.beginPath();
    this.points.forEach((p, i) =>
      i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y),
    );

    if (this.closed) ctx.closePath();

    if (this.fill && this.closed) ctx.fill(); // only fill if closed
    ctx.stroke();
  }

  getBoundingBox() {
    const xs = this.points.map((p) => p.x);
    const ys = this.points.map((p) => p.y);
    return {
      x: Math.min(...xs),
      y: Math.min(...ys),
      width: Math.max(...xs) - Math.min(...xs),
      height: Math.max(...ys) - Math.min(...ys),
    };
  }

  isHit(x, y) {
    const box = this.getBoundingBox();
    return (
      x >= box.x &&
      x <= box.x + box.width &&
      y >= box.y &&
      y <= box.y + box.height
    );
  }

  scale(factor) {
    this.points = this.points.map((p) => ({
      x: this.points[0].x + (p.x - this.points[0].x) * factor,
      y: this.points[0].y + (p.y - this.points[0].y) * factor,
    }));
  }

  close() {
    this.closed = true;
  }
}
