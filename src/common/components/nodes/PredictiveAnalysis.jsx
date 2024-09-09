import React from 'react';
import BaseNode from './BaseNode';
import { BarChart } from 'lucide-react';

const PredictiveAnalysis = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={BarChart} 
      type="predictiveAnalysis"
      baseColor="#553C9A"
      gradientFrom="from-purple-800/30"
      gradientTo="to-purple-700/10"
    >
      Predictive Analysis
    </BaseNode>
  );
};

export default PredictiveAnalysis;

// Path: src/common/components/nodes/PredictiveAnalysis.jsx