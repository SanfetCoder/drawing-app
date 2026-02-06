import { Brush, Circle } from 'lucide-react';
import { useDrawingStore } from '../stores/useDrawingStore';
import clsx from 'clsx';
import { DRAW_MODES } from '../types/draw-mode.type';
import { forwardRef, type RefObject } from 'react';

const MINIMUM_LINE_WIDTH: number = 5;
const MAXIMUM_LINE_WIDTH: number = 100;

interface ToolbarProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

const Toolbar = forwardRef<HTMLCanvasElement, ToolbarProps>(({ canvasRef }) => {
  const drawMode = useDrawingStore((state) => state.drawMode);
  const lineWidth = useDrawingStore((state) => state.lineWidth);
  const strokeColor = useDrawingStore((state) => state.strokeColor);
  const setLineWidth = useDrawingStore((state) => state.setLineWidth);
  const setStrokeColor = useDrawingStore((state) => state.setStrokeColor);

  function handleClearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <nav className="flex flex-col w-[100px] items-center gap-y-3 absolute top-1/2 right-10">
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
      <button onClick={handleClearCanvas}>Clear</button>
    </nav>
  );
});

Toolbar.displayName = 'Toolbar';

export default Toolbar;
