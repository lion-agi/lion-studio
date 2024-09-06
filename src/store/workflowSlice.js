import { nanoid } from 'nanoid';

export const createWorkflowSlice = (set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, { ...node, id: nanoid() }] })),
  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map((node) => (node.id === id ? { ...node, ...data } : node)),
  })),
  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== id),
    edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
  })),
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setSelectedNode: (node) => set({ selectedNode: node }),
  onNodesChange: (changes) => {
    set((state) => {
      const { nodes } = state;
      changes.forEach((change) => {
        const index = nodes.findIndex((n) => n.id === change.id);
        if (index !== -1) {
          nodes[index] = { ...nodes[index], ...change };
        }
      });
      return { nodes: [...nodes] };
    });
  },
  onEdgesChange: (changes) => {
    set((state) => {
      const { edges } = state;
      changes.forEach((change) => {
        const index = edges.findIndex((e) => e.id === change.id);
        if (index !== -1) {
          edges[index] = { ...edges[index], ...change };
        }
      });
      return { edges: [...edges] };
    });
  },
  onConnect: (connection) => set((state) => ({
    edges: [...state.edges, { ...connection, id: nanoid() }],
  })),
});