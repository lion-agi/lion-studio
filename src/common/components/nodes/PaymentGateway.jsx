import React from 'react';
import BaseNode from './BaseNode';
import { CreditCard } from 'lucide-react';

const PaymentGateway = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={CreditCard} 
      type="paymentGateway"
      baseColor="#E53E3E"
      gradientFrom="from-red-700/30"
      gradientTo="to-red-600/10"
    >
      Payment Gateway
    </BaseNode>
  );
};

export default PaymentGateway;