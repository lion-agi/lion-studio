import React from 'react';
import BaseNode from './BaseNode';
import { Video } from 'lucide-react';

const VideoConference = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Video} 
      type="videoConference"
      baseColor="#1A365D"
      gradientFrom="from-blue-950/30"
      gradientTo="to-blue-900/10"
    >
      Video Conference
    </BaseNode>
  );
};

export default VideoConference;

// Path: src/common/components/nodes/VideoConference.jsx