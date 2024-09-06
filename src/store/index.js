import { create } from 'zustand';
import { createAuthSlice } from './authSlice';
import { createWorkflowSlice } from './workflowSlice';
import { createLibrarySlice } from './librarySlice';

export const useStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createWorkflowSlice(...a),
  ...createLibrarySlice(...a),
}));