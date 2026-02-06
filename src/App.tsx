import { useEffect, useRef, useState } from 'react';
import './App.css';
import { useMousePosition } from './shared/hooks/useMousePosition';
import { useDetectMouseClicked } from './shared/hooks/useDetectMouseClicked';

const MINIMUM_LINE_WIDTH: number = 10;
const MAXIMUM_LINE_WIDTH: number = 100;

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lineWidth, setLineWidth] = useState<number>(MINIMUM_LINE_WIDTH);
  const [strokeColor, setStrokeColor] = useState<string>('#000000');
  const isMouseClicked = useDetectMouseClicked();
  const mousePosition = useMousePosition();

  useEffect(() => {
    if (!mousePosition || !isMouseClicked) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { left: canvasLeft, top: canvasTop } = canvas.getBoundingClientRect();

    const [mouseX, mouseY] = [mousePosition.x, mousePosition.y];

    ctx.lineTo(mouseX - canvasLeft, mouseY - canvasTop);
    ctx.stroke();
  }, [mousePosition?.x, mousePosition?.y, isMouseClicked]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
  }, [lineWidth, strokeColor]);

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
      <h3>{isMouseClicked ? 'clicked' : 'released'}</h3>
    </main>
  );
}

export default App;
