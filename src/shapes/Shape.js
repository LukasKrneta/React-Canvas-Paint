export default class Shape {
  constructor({ stroke = "black", fill = null, lineWidth = 2, dash = [] }) {
    this.stroke = stroke;
    this.fill = fill;
    this.lineWidth = lineWidth;
    this.dash = dash;
    this.selected = false;
  }

  applyStyle(ctx) {
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.lineWidth;
    ctx.setLineDash(this.dash);
    if (this.fill) ctx.fillStyle = this.fill;
  }

  drawBoundingBox(ctx, box) {
    if (!this.selected) return;

    ctx.save();
    ctx.strokeStyle = "blue";
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(box.x, box.y, box.width, box.height);
    ctx.restore();
  }

  isHit() {
    return false;
  }

  scale() {}
}
