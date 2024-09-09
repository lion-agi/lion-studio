import React from 'react';
import BaseNode from './BaseNode';
import { Image } from 'lucide-react';

const ImageRecognition = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Image} 
      type="imageRecognition"
      baseColor="#6B46C1"
      gradientFrom="from-purple-700/30"
      gradientTo="to-purple-600/10"
    >
      Image Recognition
    </BaseNode>
  );
};

export default ImageRecognition;