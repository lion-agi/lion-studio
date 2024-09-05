import React from 'react';
import BaseNode from './BaseNode';
import { User } from 'lucide-react';

const HumanUser = (props) => {
  return <BaseNode {...props} icon={User} type="user" />;
};

export default HumanUser;