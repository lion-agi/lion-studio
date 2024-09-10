import React from 'react';
import BaseNode from './BaseNode';
import { PieChart } from 'lucide-react';

const SentimentAnalysis = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={PieChart} 
      type="sentimentAnalysis"
      baseColor="#44337A"
      gradientFrom="from-purple-900/30"
      gradientTo="to-purple-800/10"
    >
      Sentiment Analysis
    </BaseNode>
  );
};

export default SentimentAnalysis;

// Path: src/common/components/nodes/SentimentAnalysis.jsx