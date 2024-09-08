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
  // This is a placeholder and should be implemented based on your specific requirements
  return apiCalls.map(call => ({
    date: call.timestamp,
    cost: call.cost
  }));
};

const calculateCostBreakdown = (apiCalls) => {
  // Implementation for cost breakdown calculation
  // This is a placeholder and should be implemented based on your specific requirements
  const breakdown = {};
  apiCalls.forEach(call => {
    if (!breakdown[call.model]) {
      breakdown[call.model] = 0;
    }
    breakdown[call.model] += call.cost;
  });
  return Object.entries(breakdown).map(([model, cost]) => ({ model, cost }));
};

const calculatePerformance = (apiCalls) => {
  // Implementation for performance calculation
  // This is a placeholder and should be implemented based on your specific requirements
  return apiCalls.map(call => ({
    date: call.timestamp,
    responseTime: call.response_time,
    errorRate: call.error ? 1 : 0
  }));
};