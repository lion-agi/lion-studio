import { create } from 'zustand';

export const useWorkflowStore = create((set, get) => ({
  nodes: [],
  edges: [],
  isGraphLocked: false,
  history: [],
  historyIndex: -1,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setIsGraphLocked: (isLocked) => set({ isGraphLocked: isLocked }),

  addToHistory: (state) => {
    const newHistory = get().history.slice(0, get().historyIndex + 1);
    newHistory.push(state);
    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const previousState = history[newIndex];
      set({
        nodes: previousState.nodes,
        edges: previousState.edges,
        historyIndex: newIndex,
      });
    }
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextState = history[newIndex];
      set({
        nodes: nextState.nodes,
        edges: nextState.edges,
        historyIndex: newIndex,
      });
    }
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,
}));