import { useRef } from 'react';
import './App.css';
import Toolbar from './features/drawing/components/Toolbar';
import { useDraw } from './features/drawing/hooks/useDraw';

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useDraw(canvasRef);

  return (
    <main>
      <canvas ref={canvasRef} width={500} height={500}></canvas>

      <Toolbar canvasRef={canvasRef} />
    </main>
  );
}

export default App;
