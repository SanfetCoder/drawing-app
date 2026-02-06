import { useRef, useState } from 'react';
import './App.css';
import { useDraw } from './features/drawing/hooks/useDraw';

const MINIMUM_LINE_WIDTH: number = 5;
const MAXIMUM_LINE_WIDTH: number = 100;

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lineWidth, setLineWidth] = useState<number>(MINIMUM_LINE_WIDTH);
  const [strokeColor, setStrokeColor] = useState<string>('#000000');

  useDraw(canvasRef, { lineWidth, strokeColor });

  function handleClearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <main>
      <canvas ref={canvasRef} width={500} height={500}></canvas>
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
      <button onClick={handleClearCanvas}>Clear Canvas</button>
    </main>
  );
}

export default App;
