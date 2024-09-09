export const mockData = {
    summary: {
      totalCost: 12456.78,
      totalCalls: 52890,
      avgResponseTime: 287,
      errorRate: 0.018,
      costChange: 0.052,
      callsChange: 0.079,
      responseTimeChange: -0.021,
      errorRateChange: 0.003
    },
    costTrend: [
      { date: '2023-05-01', cost: 1500.00 },
      { date: '2023-05-02', cost: 1650.00 },
      { date: '2023-05-03', cost: 1800.00 },
      { date: '2023-05-04', cost: 1750.00 },
      { date: '2023-05-05', cost: 1900.00 },
      { date: '2023-05-06', cost: 2100.00 },
      { date: '2023-05-07', cost: 1950.00 }
    ],
    costBreakdown: [
        { model: 'GPT-3.5', cost: 5000.00 },
        { model: 'GPT-4', cost: 7000.00 },
        { model: 'DALL-E', cost: 3000.00 },
        { model: 'Other', cost: 1000.00 }
      ],
    performance: [
      { date: '2023-05-01', responseTime: 250, errorRate: 0.015 },
      { date: '2023-05-02', responseTime: 280, errorRate: 0.017 },
      { date: '2023-05-03', responseTime: 270, errorRate: 0.016 },
      { date: '2023-05-04', responseTime: 290, errorRate: 0.018 },
      { date: '2023-05-05', responseTime: 300, errorRate: 0.020 },
      { date: '2023-05-06', responseTime: 285, errorRate: 0.019 },
      { date: '2023-05-07', responseTime: 275, errorRate: 0.017 }
    ],
    recentCalls: [
      { id: 'call-1', timestamp: '2023-05-07T14:32:15', endpoint: 'gpt-4', tokens: 150, cost: 0.15, responseTime: 280 },
      { id: 'call-2', timestamp: '2023-05-07T14:31:58', endpoint: 'gpt-3.5-turbo', tokens: 100, cost: 0.05, responseTime: 180 },
      { id: 'call-3', timestamp: '2023-05-07T14:31:30', endpoint: 'dall-e', tokens: 200, cost: 0.20, responseTime: 350 },
      { id: 'call-4', timestamp: '2023-05-07T14:30:45', endpoint: 'gpt-4', tokens: 180, cost: 0.18, responseTime: 300 },
      { id: 'call-5', timestamp: '2023-05-07T14:30:00', endpoint: 'gpt-3.5-turbo', tokens: 120, cost: 0.06, responseTime: 200 }
    ]
  };

  // Path: src/features/dashboard/MockData.js