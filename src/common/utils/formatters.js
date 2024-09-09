export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'N/A' : date.toLocaleString();
};

export const formatNumber = (num) => {
  return typeof num === 'number' ? num.toLocaleString() : 'N/A';
};

export const formatCurrency = (amount) => {
  return typeof amount === 'number' ? `$${amount.toFixed(2)}` : 'N/A';
};

export const formatResponseTime = (time) => {
  return typeof time === 'number' ? `${time} ms` : 'N/A';
};