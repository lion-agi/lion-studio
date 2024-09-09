import React from 'react';
import BaseNode from './BaseNode';
import { CloudRain } from 'lucide-react';

const WeatherService = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={CloudRain} 
      type="weatherService"
      baseColor="#FC8181"
      gradientFrom="from-red-500/30"
      gradientTo="to-red-400/10"
    >
      Weather Service
    </BaseNode>
  );
};

export default WeatherService;