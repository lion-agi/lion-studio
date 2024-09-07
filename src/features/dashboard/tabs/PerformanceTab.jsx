import React from 'react';
import PerformanceChart from '../charts/PerformanceChart';

const PerformanceTab = ({ data }) => (
  <PerformanceChart data={data.performance} />
);

export default PerformanceTab;