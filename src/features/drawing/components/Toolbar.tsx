import { Brush, Circle } from 'lucide-react';
import { useDrawingStore } from '../stores/useDrawingStore';
import clsx from 'clsx';
import { DRAW_MODES } from '../types/draw-mode.type';
import { forwardRef, type RefObject } from 'react';

interface ToolbarProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

const Toolbar = forwardRef<HTMLCanvasElement, ToolbarProps>(({ canvasRef }) => {
  const drawMode = useDrawingStore((state) => state.drawMode);

  function handleClearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <nav className="flex w-full justify-center gap-x-2">
      <Brush
        className={clsx(
          'cursor-pointer rounded-md p-2',
          drawMode === DRAW_MODES.BRUSH && 'bg-gray-200',
        )}
        size={40}
        onClick={() => useDrawingStore.setState({ drawMode: DRAW_MODES.BRUSH })}
      />
      <Circle
        className={clsx(
          'cursor-pointer rounded-md p-2',
          drawMode === DRAW_MODES.CIRCLE && 'bg-gray-200',
        )}
        size={40}
        onClick={() =>
          useDrawingStore.setState({ drawMode: DRAW_MODES.CIRCLE })
        }
      />
      <button onClick={handleClearCanvas}>Clear Canvas</button>
    </nav>
  );
});

Toolbar.displayName = 'Toolbar';

export default Toolbar;
