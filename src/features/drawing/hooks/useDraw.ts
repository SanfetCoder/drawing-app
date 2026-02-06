import { useEffect, type RefObject } from 'react';
import { useMousePosition } from '../../../shared/hooks/useMousePosition';
import { useDetectMouseClicked } from '../../../shared/hooks/useDetectMouseClicked';

export function useDraw(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useDrawLineWhenMouseMoving(canvasRef);

  useBeginNewPathWhenMouseLifted(canvasRef);
}

function useDrawLineWhenMouseMoving(
  canvasRef: RefObject<HTMLCanvasElement | null>,
) {
  const mousePosition = useMousePosition();
  const isMouseClicked = useDetectMouseClicked();

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
}

function useBeginNewPathWhenMouseLifted(
  canvasRef: RefObject<HTMLCanvasElement | null>,
) {
  const isMouseClicked = useDetectMouseClicked();

  useEffect(() => {
    const liftFingerOffMouse = !isMouseClicked;

    if (liftFingerOffMouse) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.beginPath();
    }
  }, [isMouseClicked]);
}
