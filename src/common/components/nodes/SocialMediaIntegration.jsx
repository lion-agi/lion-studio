import React from 'react';
import BaseNode from './BaseNode';
import { Share2 } from 'lucide-react';

const SocialMediaIntegration = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Share2} 
      type="socialMediaIntegration"
      baseColor="#9B2C2C"
      gradientFrom="from-red-900/30"
      gradientTo="to-red-800/10"
    >
      Social Media Integration
    </BaseNode>
  );
};

export default SocialMediaIntegration;