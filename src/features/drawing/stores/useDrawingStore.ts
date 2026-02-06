import { create } from 'zustand';
import { DRAW_MODES } from '../types/draw-mode.type';

const MINIMUM_LINE_WIDTH: number = 5;

interface States {
  drawMode: DRAW_MODES;
  lineWidth: number;
  strokeColor: string;
}

interface Actions {
  setDrawMode: (drawMode: DRAW_MODES) => void;
  setLineWidth: (lineWidth: number) => void;
  setStrokeColor: (strokeColor: string) => void;
}

const INITIAL_STATE: States = {
  drawMode: DRAW_MODES.BRUSH,
  lineWidth: MINIMUM_LINE_WIDTH,
  strokeColor: '#000000',
};

export const useDrawingStore = create<States & Actions>((set) => ({
  ...INITIAL_STATE,
  setDrawMode: (drawMode: DRAW_MODES) => set({ drawMode }),
  setLineWidth: (lineWidth: number) => set({ lineWidth }),
  setStrokeColor: (strokeColor: string) => set({ strokeColor }),
}));
