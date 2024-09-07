import { formatDate } from './utils';

// Mock data generation functions
const generateCostTrendData = (days) => {
  const data = [];
  const today = new Date();
  for (let i = days; i > 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: formatDate(date),
      cost: Math.random() * 1000 + 500, // Random cost between 500 and 1500
    });
  }
  return data;
};

const generatePerformanceData = (days) => {
  const data = [];
  const today = new Date();
  for (let i = days; i > 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: formatDate(date),
      responseTime: Math.random() * 500 + 100, // Random response time between 100 and 600 ms
      errorRate: Math.random() * 0.05, // Random error rate between 0% and 5%
    });
  }
  return data;
};

const generateRecentCalls = (count) => {
  const providers = ['OpenAI', 'Anthropic', 'Cohere', 'AI21 Labs'];
  const models = {
    'OpenAI': ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    'Anthropic': ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
    'Cohere': ['command', 'command-light', 'command-nightly'],
    'AI21 Labs': ['j2-ultra', 'j2-mid', 'j2-light']
  };
  const endpoints = {
    'OpenAI': 'chat/completions',
    'Anthropic': 'messages',
    'Cohere': 'generate',
    'AI21 Labs': 'complete'
  };
  const methods = ['POST', 'GET'];
  const baseUrls = {
    'OpenAI': 'https://api.openai.com/v1/',
    'Anthropic': 'https://api.anthropic.com/v1/',
    'Cohere': 'https://api.cohere.ai/v1/',
    'AI21 Labs': 'https://api.ai21.com/studio/v1/'
  };

  const calls = [];
  for (let i = 0; i < count; i++) {
    const provider = providers[Math.floor(Math.random() * providers.length)];
    const model = models[provider][Math.floor(Math.random() * models[provider].length)];
    calls.push({
      id: `call-${i}`,
      timestamp: new Date(Date.now() - i * 60000).toISOString(), // Each call 1 minute apart
      provider: provider,
      model: model,
      endpoint: endpoints[provider],
      method: methods[Math.floor(Math.random() * methods.length)],
      baseUrl: baseUrls[provider],
      tokens: Math.floor(Math.random() * 1000) + 100,
      cost: (Math.random() * 0.1 + 0.01),
      responseTime: Math.floor(Math.random() * 1000) + 100,
    });
  }
  return calls;
};

export const fetchApiData = async (timeRange, selectedModel) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;

  const costTrend = generateCostTrendData(days);
  const performance = generatePerformanceData(days);
  const recentCalls = generateRecentCalls(100);

  const totalCost = costTrend.reduce((sum, day) => sum + day.cost, 0);
  const avgResponseTime = performance.reduce((sum, day) => sum + day.responseTime, 0) / performance.length;
  const avgErrorRate = performance.reduce((sum, day) => sum + day.errorRate, 0) / performance.length;

  return {
    summary: {
      totalCost,
      totalCalls: recentCalls.length,
      avgResponseTime,
      errorRate: avgErrorRate,
      costChange: Math.random() * 0.2 - 0.1, // Random change between -10% and 10%
      callsChange: Math.random() * 0.3 - 0.15, // Random change between -15% and 15%
      responseTimeChange: Math.random() * 0.2 - 0.1,
      errorRateChange: Math.random() * 0.1 - 0.05,
    },
    costTrend,
    costBreakdown: [
      { model: 'gpt-3.5-turbo', cost: totalCost * 0.4 },
      { model: 'gpt-4', cost: totalCost * 0.5 },
      { model: 'claude-3-opus', cost: totalCost * 0.1 },
    ],
    performance,
    recentCalls,
  };
};