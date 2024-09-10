import APICall from './APICall';
import AssistantNode from './AssistantNode';
import HumanUser from './HumanUser';
import Note from './Note';
import DatabaseNode from './DatabaseNode';
import WorkflowNode from './WorkflowNode';
import MixtureOfExperts from './MixtureOfExperts';

export const nodeTypes = {
  apiCall: APICall,
  assistant: AssistantNode,
  user: HumanUser,
  note: Note,
  database: DatabaseNode,
  workflow: WorkflowNode,
  experts: MixtureOfExperts,
};