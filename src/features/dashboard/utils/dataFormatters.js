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
  // Implementation for cost trend calculation
  // ...
};

const calculateCostBreakdown = (apiCalls) => {
  // Implementation for cost breakdown calculation
  // ...
};

const calculatePerformance = (apiCalls) => {
  // Implementation for performance calculation
  // ...
};