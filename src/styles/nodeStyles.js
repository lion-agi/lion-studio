export const nodeColors = {
  assistant: '#6366f1',
  user: '#22c55e',
  group: '#eab308',
  note: '#f97316',
  initializer: '#ec4899',
  database: '#8b5cf6',
  workflow: '#14b8a6',
  api: '#f43f5e',
};

export const getNodeStyle = (type, isSelected) => {
  const color = nodeColors[type] || '#6366f1';
  return {
    background: `linear-gradient(to bottom right, ${color}20, ${color}10)`,
    borderColor: isSelected ? color : 'transparent',
    borderWidth: isSelected ? '2px' : '1px',
    borderStyle: 'solid',
    boxShadow: isSelected 
      ? `0 0 0 2px ${color}, 0 4px 10px rgba(0, 0, 0, 0.1)` 
      : '0 2px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  };
};

export const getHeaderStyle = (type) => {
  const color = nodeColors[type] || '#6366f1';
  return {
    background: `${color}`,
    color: 'white',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    borderBottom: `3px solid ${color}`,
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    padding: '8px 12px',
  };
};

export const getContentStyle = () => ({
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '12px',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
});