import { useEffect, type RefObject } from 'react';
import {
  useMousePosition,
  type MousePosition,
} from '../../../shared/hooks/useMousePosition';
import { useDetectMouseClicked } from '../../../shared/hooks/useDetectMouseClicked';

export function useDraw(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  { lineWidth, strokeColor }: { lineWidth: number; strokeColor: string },
) {
  const isMouseClicked = useDetectMouseClicked();
  const mousePosition = useMousePosition();

  useDrawLineWhenMouseMoving(canvasRef, isMouseClicked, mousePosition);

  useBeginNewPathWhenMouseLifted(canvasRef, isMouseClicked);

  useSetCanvasStyle(canvasRef, lineWidth, strokeColor);

  useDrawLineWhenMousePressed(
    canvasRef,
    lineWidth,
    isMouseClicked,
    mousePosition,
  );
}

function useDrawLineWhenMouseMoving(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  isMouseClicked: boolean,
  mousePosition: MousePosition | null,
) {
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

function useSetCanvasStyle(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  lineWidth: number,
  strokeColor: string,
) {
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
  }, [lineWidth, strokeColor]);
}

function useDrawLineWhenMousePressed(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  lineWidth: number,
  isMouseClicked: boolean,
  mousePosition: MousePosition | null,
) {
  useEffect(() => {
    if (!mousePosition || !isMouseClicked) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { left: canvasLeft, top: canvasTop } = canvas.getBoundingClientRect();

    ctx.rect(
      mousePosition.x - canvasLeft,
      mousePosition.y - canvasTop,
      lineWidth,
      lineWidth,
    );
    ctx.fill();
  }, [mousePosition?.x, mousePosition?.y, isMouseClicked, lineWidth]);
}
