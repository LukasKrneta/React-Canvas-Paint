import Shape from "./Shape";

export default class Line extends Shape {
  constructor(x1, y1, x2, y2, style) {
    super(style);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw(ctx) {
    this.applyStyle(ctx);
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();

    this.drawBoundingBox(ctx, this.getBoundingBox());
  }

  getBoundingBox() {
    return {
      x: Math.min(this.x1, this.x2),
      y: Math.min(this.y1, this.y2),
      width: Math.abs(this.x2 - this.x1),
      height: Math.abs(this.y2 - this.y1),
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
    const minLength = 10;
    const dx = this.x2 - this.x1;
    const dy = this.y2 - this.y1;
    const currentLength = Math.hypot(dx, dy) || 1;
    const targetLength = Math.max(currentLength * factor, minLength);
    const normalizedDx = dx / currentLength;
    const normalizedDy = dy / currentLength;

    this.x2 = this.x1 + normalizedDx * targetLength;
    this.y2 = this.y1 + normalizedDy * targetLength;
  }
}
