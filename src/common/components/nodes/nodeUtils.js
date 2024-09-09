import { nodeCategories } from './nodeCategories';

export const createNode = (type, position) => {
  const nodeConfig = nodeCategories
    .flatMap(category => category.nodes)
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
      baseColor: nodeConfig.baseColor,
      gradientFrom: nodeConfig.gradientFrom,
      gradientTo: nodeConfig.gradientTo,
    },
  };
};

export const getNodeColor = (node) => {
  const nodeConfig = nodeCategories
    .flatMap(category => category.nodes)
    .find(n => n.type === node.type);

  return nodeConfig ? nodeConfig.baseColor : '#64748B';
};
