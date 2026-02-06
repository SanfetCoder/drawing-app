import { useEffect, useState } from 'react';

export interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition | null {
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(
    null,
  );

  useEffect(() => {
    document.addEventListener('mousemove', (event) => {
      const [mouseX, mouseY] = [event.clientX, event.clientY];

      setMousePosition({ x: mouseX, y: mouseY });
    });

    return () => {
      document.removeEventListener('mousemove', () => {});
    };
  }, []);

  return mousePosition ? { x: mousePosition.x, y: mousePosition.y } : null;
}
