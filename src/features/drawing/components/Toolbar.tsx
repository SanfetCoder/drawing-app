import { Brush, Circle } from 'lucide-react';
import { useDrawingStore } from '../stores/useDrawingStore';
import clsx from 'clsx';
import { DRAW_MODES } from '../types/draw-mode.type';

function Toolbar() {
  const drawMode = useDrawingStore((state) => state.drawMode);

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
    </nav>
  );
}

export default Toolbar;
