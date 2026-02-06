import { useEffect, type RefObject } from 'react';
import { useDetectMouseClicked } from '../../../shared/hooks/useDetectMouseClicked';
import {
  useMousePosition,
  type MousePosition,
} from '../../../shared/hooks/useMousePosition';
import { useDrawingStore } from '../stores/useDrawingStore';
import { DRAW_MODES } from '../types/draw-mode.type';
import { useDetectMouseOnElement } from '../../../shared/hooks/useDetectMouseOnElement';

export function useDraw(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const isMouseClicked = useDetectMouseClicked();
  const mousePosition = useMousePosition();

  useDrawLineWhenMouseMoving(canvasRef, isMouseClicked, mousePosition);

  useBeginNewPathWhenMouseLifted(canvasRef, isMouseClicked);

  useSetCanvasStyle(canvasRef);
}

function useDrawLineWhenMouseMoving(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  isMouseClicked: boolean,
  mousePosition: MousePosition | null,
) {
  const drawMode = useDrawingStore((state) => state.drawMode);
  const isMouseInsideCanvas = useDetectMouseOnElement(canvasRef);

  useEffect(() => {
    if (
      !mousePosition ||
      !isMouseClicked ||
      drawMode !== DRAW_MODES.BRUSH ||
      !isMouseInsideCanvas
    )
      return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { left: canvasLeft, top: canvasTop } = canvas.getBoundingClientRect();

    const [mouseX, mouseY] = [mousePosition.x, mousePosition.y];

    ctx.lineTo(mouseX - canvasLeft, mouseY - canvasTop);
    ctx.lineCap = 'round';
    ctx.stroke();
  }, [mousePosition?.x, mousePosition?.y, isMouseClicked]);
}

function useBeginNewPathWhenMouseLifted(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  isMouseClicked: boolean,
) {
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

function useSetCanvasStyle(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const lineWidth = useDrawingStore((state) => state.lineWidth);
  const strokeColor = useDrawingStore((state) => state.strokeColor);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.lineCap = 'round';
  }, [lineWidth, strokeColor]);
}
