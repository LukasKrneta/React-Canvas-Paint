import React, { useRef, useState, useEffect } from "react";
import { ShapeFactory } from "./shapes/ShapeFactory";

export default function Canvas({ tool, style }) {
  const canvasRef = useRef();
  const [shapes, setShapes] = useState([]);
  const [current, setCurrent] = useState(null);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight * 0.7,
  });

  // Update canvas size when window resizes
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight * 0.7 });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const redraw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((s) => s.draw(ctx));
  };

  useEffect(() => {
    redraw();
  }, [shapes, size]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    if (tool === "line") {
      setCurrent({ x1: offsetX, y1: offsetY });
    } else if (tool === "ellipse") {
      const shape = ShapeFactory.create(
        "ellipse",
        offsetX,
        offsetY,
        50,
        30,
        style,
      );
      setShapes([...shapes, shape]);
    } else if (tool === "freedraw") {
      setCurrent({ points: [{ x: offsetX, y: offsetY }] });
    }
  };

  const handleMouseMove = (e) => {
    if (!current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    if (tool === "freedraw") {
      current.points.push({ x: offsetX, y: offsetY });
      redraw();
      ShapeFactory.create("freedraw", current.points, style).draw(
        canvasRef.current.getContext("2d"),
      );
    }
  };

  const handleMouseUp = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    if (tool === "line" && current) {
      const shape = ShapeFactory.create(
        "line",
        current.x1,
        current.y1,
        offsetX,
        offsetY,
        style,
      );
      setShapes([...shapes, shape]);
    }

    if (tool === "freedraw" && current) {
      const fillShape = !!style.fill; // only close path if user selected a fill color
      const shape = ShapeFactory.create(
        "freedraw",
        current.points,
        style,
        fillShape,
      );
      setShapes([...shapes, shape]);
    }

    setCurrent(null);
  };

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    shapes.forEach((s) => (s.selected = s.isHit(offsetX, offsetY)));
    redraw();
  };

  const handleWheel = (e) => {
    const selectedShape = shapes.find((shape) => shape.selected);
    if (!selectedShape) return;

    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    selectedShape.scale(factor);
    setShapes([...shapes]);
  };

  return (
    <canvas
      ref={canvasRef}
      width={size.width}
      height={size.height}
      style={{ border: "1px solid black", display: "block" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      onWheel={handleWheel}
    />
  );
}
