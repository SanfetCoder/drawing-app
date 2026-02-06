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
      left: elementLeft,
      right: elementRight,
      top: elementTop,
      bottom: elementBottom,
    } = canvas.getBoundingClientRect();

    const mouseIsInHorizontalRange =
      elementLeft <= mousePosition.x && mousePosition.x <= elementRight;

    const mouseIsInVerticalRange =
      elementTop <= mousePosition.y && elementBottom >= mousePosition.y;

    const isInsideElement = mouseIsInHorizontalRange && mouseIsInVerticalRange;

    setIsMouseInsideElement(isInsideElement);
  }, [mousePosition?.x, mousePosition?.y]);

  return isMouseInsideElement;
}
