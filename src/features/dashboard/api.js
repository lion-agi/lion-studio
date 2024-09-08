import { formatDate } from './utils';

const generateCostTrendData = (apiCalls, timeRange) => {
  const costByDate = apiCalls.reduce((acc, call) => {
    const date = formatDate(new Date(call.created_at));
    acc[date] = (acc[date] || 0) + call.cost;
    return acc;
  }, {});

  return Object.entries(costByDate).map(([date, cost]) => ({ date, cost }));
};

const generatePerformanceData = (apiCalls, timeRange) => {
  const perfByDate = apiCalls.reduce((acc, call) => {
    const date = formatDate(new Date(call.created_at));
    if (!acc[date]) {
      acc[date] = { responseTime: 0, errorCount: 0, totalCalls: 0 };
    }
    acc[date].responseTime += call.response_time;
    acc[date].errorCount += call.error ? 1 : 0;
    acc[date].totalCalls += 1;
    return acc;
  }, {});

  return Object.entries(perfByDate).map(([date, data]) => ({
    date,
    responseTime: data.responseTime / data.totalCalls,
    errorRate: data.errorCount / data.totalCalls,
  }));
};

export const fetchApiData = async (apiCalls, apiStats, selectedModel, timeRange) => {
  // Filter apiCalls based on selectedModel if needed
  const filteredCalls = selectedModel === 'all' 
    ? apiCalls 
    : apiCalls.filter(call => call.model === selectedModel);

  const costTrend = generateCostTrendData(filteredCalls, timeRange);
  const performance = generatePerformanceData(filteredCalls, timeRange);

  return {
    summary: {
      totalCost: apiStats.totalCost,
      totalCalls: apiStats.totalCalls,
      avgResponseTime: apiStats.avgResponseTime,
      errorRate: apiStats.errorRate,
      costChange: Math.random() * 0.2 - 0.1, // Random change between -10% and 10%
      callsChange: Math.random() * 0.3 - 0.15, // Random change between -15% and 15%
      responseTimeChange: Math.random() * 0.2 - 0.1,
      errorRateChange: Math.random() * 0.1 - 0.05,
    },
    costTrend,
    costBreakdown: [
      { model: 'gpt-3.5-turbo', cost: apiStats.totalCost * 0.4 },
      { model: 'gpt-4', cost: apiStats.totalCost * 0.5 },
      { model: 'claude-3-opus', cost: apiStats.totalCost * 0.1 },
    ],
    performance,
    recentCalls: filteredCalls.slice(0, 100), // Get the 100 most recent calls
  };
};