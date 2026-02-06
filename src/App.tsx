import { useRef } from 'react';
import './App.css';
import Toolbar from './features/drawing/components/Toolbar';
import { useDraw } from './features/drawing/hooks/useDraw';
import { useDetectMouseOnElement } from './shared/hooks/useDetectMouseOnElement';

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useDraw(canvasRef);

  const isMouseInsideCanvas = useDetectMouseOnElement(canvasRef);

  return (
    <main>
      <canvas
        className="border border-gray-600 border-3"
        ref={canvasRef}
        width={650}
        height={650}
      ></canvas>

      <Toolbar canvasRef={canvasRef} />

      <p>{isMouseInsideCanvas ? 'Inside Canvas' : 'Outside Canvas'}</p>
    </main>
  );
}

export default App;
