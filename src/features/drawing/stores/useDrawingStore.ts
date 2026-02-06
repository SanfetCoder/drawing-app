import { create } from 'zustand';
import { DRAW_MODES } from '../types/draw-mode.type';

interface States {
  drawMode: DRAW_MODES;
}

interface Actions {
  setDrawMode: (drawMode: DRAW_MODES) => void;
}

const INITIAL_STATE: States = {
  drawMode: DRAW_MODES.BRUSH,
};

export const useDrawingStore = create<States & Actions>((set) => ({
  ...INITIAL_STATE,
  setDrawMode: (drawMode: DRAW_MODES) => set({ drawMode }),
}));
