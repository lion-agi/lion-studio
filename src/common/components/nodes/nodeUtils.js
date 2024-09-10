import { nodeCategories } from './nodeCategories';

export const createNode = (type, position) => {
  const nodeConfig = Object.values(nodeCategories)
    .flat()
    .find(node => node.type === type);

  if (!nodeConfig) {
    throw new Error(`Unknown node type: ${type}`);
  }

  return {
    id: `${type}-${Date.now()}`,
    type,
    position,
    data: { 
      label: nodeConfig.label,
      description: '',
    },
  };
};

export const getNodeColor = (node) => {
  switch (node.type) {
    case 'apiCall': return '#EC4899';
    case 'assistant': return '#F59E0B';
    case 'user': return '#3B82F6';
    case 'note': return '#EAB308';
    case 'database': return '#6366F1';
    case 'workflow': return '#22C55E';
    case 'conversation': return '#A855F7';
    case 'experts': return '#EF4444';
    default: return '#64748B';
  }
};