import { useEffect, useState, type RefObject } from 'react';
import { useMousePosition } from './useMousePosition';

export function useDetectMouseOnElement(
  element: RefObject<HTMLElement | null>,
) {
  const [isMouseInsideElement, setIsMouseInsideElement] =
    useState<boolean>(false);

  const mousePosition = useMousePosition();

  useEffect(() => {
    if (!mousePosition) return;

    const canvas = element.current;
    if (!canvas) return;

    const {
      left: canvasLeft,
      right: canvasRight,
      top: canvasTop,
      bottom: canvasBottom,
    } = canvas.getBoundingClientRect();

    setIsMouseInsideElement(
      canvasLeft <= mousePosition.x &&
        mousePosition.x <= canvasRight &&
        canvasTop <= mousePosition.y &&
        canvasBottom >= mousePosition.y,
    );
  }, [mousePosition?.x, mousePosition?.y]);

  return isMouseInsideElement;
}
