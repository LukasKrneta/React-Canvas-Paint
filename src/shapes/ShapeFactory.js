import Line from "./Line";
import Ellipse from "./Ellipse";
import FreeDraw from "./FreeDraw";

export const ShapeFactory = {
  create(type, ...args) {
    switch (type) {
      case "line":
        return new Line(...args);
      case "ellipse":
        return new Ellipse(...args);
      case "freedraw":
        return new FreeDraw(...args);
      default:
        return null;
    }
  },
};
