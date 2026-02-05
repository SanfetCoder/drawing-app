import { useEffect, useRef, useState } from 'react';
import './App.css';

const MINIMUM_LINE_WIDTH: number = 10;
const MAXIMUM_LINE_WIDTH: number = 100;

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lineWidth, setLineWidth] = useState<number>(MINIMUM_LINE_WIDTH);

  useEffect(() => {
    function drawRectangle() {
      const ctx = canvasRef.current?.getContext('2d');

      if (!ctx) return;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(400.5, 0);
      ctx.lineTo(400, 400);
      ctx.lineTo(0, 400);
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = lineWidth;
      ctx.closePath();

      ctx.stroke();
    }

    drawRectangle();
  }, [lineWidth]);
  return (
    <main>
      <canvas ref={canvasRef} key={lineWidth} width={400} height={400}></canvas>
      <input
        type="range"
        min={MINIMUM_LINE_WIDTH}
        max={MAXIMUM_LINE_WIDTH}
        value={lineWidth}
        onChange={(e) => setLineWidth(Number(e.target.value))}
      />
      <h3>Line Width: {lineWidth}</h3>
    </main>
  );
}

export default App;
