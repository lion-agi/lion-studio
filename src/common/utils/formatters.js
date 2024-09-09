export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
};

export const formatNumber = (num) => {
  return typeof num === 'number' ? num.toLocaleString() : 'N/A';
};

export const formatCurrency = (amount) => {
  return typeof amount === 'number' ? `$${amount.toFixed(2)}` : 'N/A';
};

export const formatResponseTime = (time) => {
  return typeof time === 'number' ? `${time.toFixed(2)} ms` : 'N/A';
};