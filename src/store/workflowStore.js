import { create } from 'zustand';

export const useWorkflowStore = create((set) => ({
  isGraphLocked: false,
  setIsGraphLocked: (isLocked) => set({ isGraphLocked: isLocked }),
}));