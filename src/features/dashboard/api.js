import { formatDate, formatNumber, formatCurrency, formatResponseTime } from '@/common/utils/formatters';

const providers = ['OpenAI', 'Anthropic', 'Cohere'];
const models = {
  OpenAI: ['GPT-3.5-turbo', 'GPT-4'],
  Anthropic: ['Claude-v1', 'Claude-instant-v1'],
  Cohere: ['Command', 'Generate']
};
const endpoints = {
  OpenAI: '/v1/chat/completions',
  Anthropic: '/v1/complete',
  Cohere: '/v1/generate'
};
const methods = ['POST', 'GET'];
const baseUrls = {
  OpenAI: 'https://api.openai.com',
  Anthropic: 'https://api.anthropic.com',
  Cohere: 'https://api.cohere.ai'
};

export const generateRecentCalls = (count) => {
  const calls = [];
  for (let i = 0; i < count; i++) {
    const provider = providers[Math.floor(Math.random() * providers.length)];
    calls.push({
      id: `call-${i}`,
      timestamp: new Date(Date.now() - i * 60000).toISOString(),
      provider,
      model: models[provider][Math.floor(Math.random() * models[provider].length)],
      endpoint: endpoints[provider],
      method: methods[Math.floor(Math.random() * methods.length)],
      baseUrl: baseUrls[provider],
      tokens: Math.floor(Math.random() * 1000) + 100,
      cost: (Math.random() * 0.1 + 0.01),
      responseTime: Math.random() * 1000 + 100,
    });
  }
  return calls;
};

export const fetchApiData = async (timeRange, selectedModel) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  const apiCalls = generateRecentCalls(100);
  const apiStats = {
    totalCost: apiCalls.reduce((sum, call) => sum + call.cost, 0),
    totalCalls: apiCalls.length,
    avgResponseTime: apiCalls.reduce((sum, call) => sum + call.responseTime, 0) / apiCalls.length,
    errorRate: Math.random() * 0.1,
  };

  return {
    summary: {
      totalCost: formatCurrency(apiStats.totalCost),
      totalCalls: formatNumber(apiStats.totalCalls),
      avgResponseTime: formatResponseTime(apiStats.avgResponseTime),
      errorRate: `${(apiStats.errorRate * 100).toFixed(2)}%`,
      costChange: `${(Math.random() * 20 - 10).toFixed(2)}%`,
      callsChange: `${(Math.random() * 30 - 15).toFixed(2)}%`,
      responseTimeChange: `${(Math.random() * 20 - 10).toFixed(2)}%`,
      errorRateChange: `${(Math.random() * 10 - 5).toFixed(2)}%`,
    },
    recentCalls: apiCalls,
  };
};