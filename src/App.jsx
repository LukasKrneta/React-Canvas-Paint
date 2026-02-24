import React, { useState } from "react";
import Canvas from "./Canvas";

export default function App() {
  const [tool, setTool] = useState("freedraw");
  const [color, setColor] = useState("#000000");
  const [fill, setFill] = useState(null);
  const [lineWidth, setLineWidth] = useState(2);
  const [dash, setDash] = useState([]);

  const style = { stroke: color, fill, lineWidth, dash };

  return (
    <div>
      <h2>ReactPaint</h2>

      <button onClick={() => setTool("freedraw")}>Free draw</button>
      <button onClick={() => setTool("line")}>Line</button>
      <button onClick={() => setTool("ellipse")}>Ellipse</button>

      <input type="color" onChange={(e) => setColor(e.target.value)} />

      <button onClick={() => setDash([])}>Solid</button>
      <button onClick={() => setDash([5, 5])}>Dashed</button>

      <button onClick={() => setFill(color)}>Fill</button>
      <button onClick={() => setFill(null)}>No Fill</button>

      <input
        type="range"
        min="1"
        max="10"
        onChange={(e) => setLineWidth(e.target.value)}
      />

      <Canvas tool={tool} style={style} />
    </div>
  );
}
