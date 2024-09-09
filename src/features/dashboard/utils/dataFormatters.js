export const formatApiCallData = (apiCalls, apiStats, selectedModel) => {
  if (!apiCalls || !apiStats) return null;

  const filteredCalls = selectedModel === 'all' 
    ? apiCalls 
    : apiCalls.filter(call => call.model === selectedModel);

  const costTrend = calculateCostTrend(filteredCalls);
  const costBreakdown = calculateCostBreakdown(filteredCalls);
  const performance = calculatePerformance(filteredCalls);

  return {
    summary: {
      totalCost: apiStats.total_cost,
      totalCalls: apiStats.total_calls,
      avgResponseTime: apiStats.avg_response_time,
      errorRate: apiStats.error_rate,
      costChange: apiStats.cost_change,
      callsChange: apiStats.calls_change,
      responseTimeChange: apiStats.response_time_change,
      errorRateChange: apiStats.error_rate_change,
    },
    costTrend,
    costBreakdown,
    performance,
    recentCalls: filteredCalls.slice(0, 100), // Get the 100 most recent calls
  };
};

const calculateCostTrend = (apiCalls) => {
  return apiCalls.reduce((acc, call) => {
    const date = call.created_at.split('T')[0];
    if (!acc[date]) {
      acc[date] = { date, cost: 0 };
    }
    acc[date].cost += call.cost;
    return acc;
  }, {});
};

const calculateCostBreakdown = (apiCalls) => {
  return apiCalls.reduce((acc, call) => {
    if (!acc[call.model]) {
      acc[call.model] = 0;
    }
    acc[call.model] += call.cost;
    return acc;
  }, {});
};

const calculatePerformance = (apiCalls) => {
  return apiCalls.reduce((acc, call) => {
    const date = call.created_at.split('T')[0];
    if (!acc[date]) {
      acc[date] = { date, responseTime: 0, errorRate: 0, count: 0 };
    }
    acc[date].responseTime += call.response_time;
    acc[date].errorRate += call.error ? 1 : 0;
    acc[date].count += 1;
    return acc;
  }, {});
};

// Path: src/features/dashboard/utils/dataFormatters.js