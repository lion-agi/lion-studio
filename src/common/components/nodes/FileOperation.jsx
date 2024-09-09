import React from 'react';
import BaseNode from './BaseNode';
import { Folder } from 'lucide-react';

const FileOperation = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Folder} 
      type="fileOperation"
      baseColor="#B83280"
      gradientFrom="from-pink-800/30"
      gradientTo="to-pink-700/10"
    >
      File Operation
    </BaseNode>
  );
};

export default FileOperation;


// Path: src/common/components/nodes/FileOperation.jsx