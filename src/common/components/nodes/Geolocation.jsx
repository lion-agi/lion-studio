import React from 'react';
import BaseNode from './BaseNode';
import { Map } from 'lucide-react';

const Geolocation = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Map} 
      type="geolocation"
      baseColor="#F56565"
      gradientFrom="from-red-600/30"
      gradientTo="to-red-500/10"
    >
      Geolocation
    </BaseNode>
  );
};

export default Geolocation;