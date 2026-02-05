import { useEffect, useRef, useState } from 'react';
import './App.css';

const MINIMUM_LINE_WIDTH: number = 10;
const MAXIMUM_LINE_WIDTH: number = 100;

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lineWidth, setLineWidth] = useState<number>(MINIMUM_LINE_WIDTH);
  const [strokeColor, setStrokeColor] = useState<string>('#000000');

  useEffect(() => {
    document.addEventListener('mousedown', (event) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { left: canvasLeft, top: canvasTop } =
        canvas.getBoundingClientRect();

      const [mouseX, mouseY] = [event.clientX, event.clientY];

      ctx.moveTo(mouseX - canvasLeft, mouseY - canvasTop);
    });

    document.addEventListener('mouseup', (event) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { left: canvasLeft, top: canvasTop } =
        canvas.getBoundingClientRect();

      const [mouseX, mouseY] = [event.clientX, event.clientY];

      ctx.lineTo(mouseX - canvasLeft, mouseY - canvasTop);
      ctx.stroke();
    });

    return () => {
      document.removeEventListener('mousedown', () => {});
      document.removeEventListener('mouseup', () => {});
    };
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
  }, [lineWidth, strokeColor]);

  return (
    <main>
      <canvas
        ref={canvasRef}
        key={`${lineWidth}-${strokeColor}`}
        width={1000}
        height={1000}
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
