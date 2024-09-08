import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAuthSlice } from './authSlice';
import { createWorkflowSlice } from './workflowSlice';
import { createLibrarySlice } from './librarySlice';
import { createIntegrationsSlice } from './integrationsSlice';

export const useStore = create(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createWorkflowSlice(...a),
      ...createLibrarySlice(...a),
      ...createIntegrationsSlice(...a),
    }),
    {
      name: 'lion-studio-store',
      partialize: (state) => ({
        activeIntegrations: state.activeIntegrations,
      }),
    }
  )
);