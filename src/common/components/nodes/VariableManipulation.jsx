import React, { useState } from 'react';
import BaseNode from './BaseNode';
import { Sliders } from 'lucide-react';
import { Button } from "@/common/components/ui/button";
import VariableManipulationModal from '../VariableManipulationModal';

const VariableManipulation = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <BaseNode 
      {...props} 
      icon={Sliders} 
      type="variableManipulation"
      baseColor="#285E61"
      gradientFrom="from-teal-900/30"
      gradientTo="to-teal-800/10"
    >
      Variable Manipulation
      <Button onClick={handleOpenModal} className="mt-2">
        Open Variable Manipulation
      </Button>
      <VariableManipulationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </BaseNode>
  );
};

export default VariableManipulation;