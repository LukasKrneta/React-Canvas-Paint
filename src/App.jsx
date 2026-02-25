import React, { useState } from "react";
import Canvas from "./Canvas";
import "./App.css";

export default function App() {
  const [tool, setTool] = useState("freedraw");
  const [color, setColor] = useState("#000000");
  const [fill, setFill] = useState(null);
  const [lineWidth, setLineWidth] = useState(2);
  const [dash, setDash] = useState([]);

  const style = { stroke: color, fill, lineWidth, dash };

  return (
    <div className="main-container">
      <div className="menu-bar">
        <h2 className="title">🎨 React Paint Pro</h2>
        
        {/* Tools Section */}
        <div className="section">
          <button 
            className={`btn ${tool === "freedraw" ? "active" : ""}`} 
            onClick={() => setTool("freedraw")}
          >✏️ Pencil</button>
          <button 
            className={`btn ${tool === "line" ? "active" : ""}`} 
            onClick={() => setTool("line")}
          >📏 Line</button>
          <button 
            className={`btn ${tool === "ellipse" ? "active" : ""}`} 
            onClick={() => setTool("ellipse")}
          >⭕ Circle</button>
        </div>

        {/* Line Style Section */}
        <div className="section">
          <button 
            className={`btn ${dash.length === 0 ? "active" : ""}`} 
            onClick={() => setDash([])}
          >Solid</button>
          <button 
            className={`btn ${dash.length > 0 ? "active" : ""}`} 
            onClick={() => setDash([5, 5])}
          >Dashed</button>
        </div>

        {/* Fill Section */}
        <div className="section">
          <button 
            className={`btn ${fill !== null ? "active" : ""}`} 
            onClick={() => setFill(color)}
          >Fill</button>
          <button 
            className={`btn ${fill === null ? "active" : ""}`} 
            onClick={() => setFill(null)}
          >No Fill</button>
        </div>

        {/* Color & Size Section */}
        <div className="section">
          <div className="input-group">
            <label>Color</label>
            <input type="color" className="color-picker" value={color} onChange={(e) => {
              setColor(e.target.value);
              if (fill !== null) setFill(e.target.value); // Updates fill color if active
            }} />
          </div>
          <div className="range-group">
            <label>Size: {lineWidth}px</label>
            <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="canvas-area">
        <Canvas tool={tool} style={style} />
      </div>
    </div>
  );
}