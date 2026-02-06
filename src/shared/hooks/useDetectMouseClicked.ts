import { useEffect, useState } from 'react';

export function useDetectMouseClicked() {
  const [isMouseClicked, setIsMouseClicked] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener('mousedown', () => {
      setIsMouseClicked(true);
    });

    document.addEventListener('mouseup', () => {
      setIsMouseClicked(false);
    });

    return () => {
      document.removeEventListener('mousedown', () => {});
      document.removeEventListener('mouseup', () => {});
    };
  }, []);

  return isMouseClicked;
}
