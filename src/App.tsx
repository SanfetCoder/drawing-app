import { useEffect, useRef, useState } from 'react';
import './App.css';

const MINIMUM_LINE_WIDTH: number = 10;
const MAXIMUM_LINE_WIDTH: number = 100;

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lineWidth, setLineWidth] = useState<number>(MINIMUM_LINE_WIDTH);
  const [strokeColor, setStrokeColor] = useState<string>('#000000');

  useEffect(() => {
    function drawRectangle() {
      const ctx = canvasRef.current?.getContext('2d');

      if (!ctx) return;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(400.5, 0);
      ctx.lineTo(400, 400);
      ctx.lineTo(0, 400);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      ctx.closePath();

      ctx.stroke();
    }

    drawRectangle();
  }, [lineWidth, strokeColor]);
  return (
    <main>
      <canvas
        ref={canvasRef}
        key={`${lineWidth}-${strokeColor}`}
        width={400}
        height={400}
      ></canvas>
      <input
        type="range"
        min={MINIMUM_LINE_WIDTH}
        max={MAXIMUM_LINE_WIDTH}
        value={lineWidth}
        onChange={(e) => setLineWidth(Number(e.target.value))}
      />
      <input
        type="color"
        value={strokeColor}
        onChange={(e) => setStrokeColor(e.target.value)}
      />
      <h3>Line Width: {lineWidth}</h3>
    </main>
  );
}

export default App;
