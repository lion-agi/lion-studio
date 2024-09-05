import AssistantNode from './AssistantNode';
import HumanUser from './HumanUser';
import MixtureOfExperts from './MixtureOfExperts';
import Note from './Note';
import Initializer from './Initializer';
import DatabaseNode from './DatabaseNode';
import WorkflowNode from './WorkflowNode';
import APICall from './APICall';

export const nodeTypes = {
  assistant: AssistantNode,
  user: HumanUser,
  moe: MixtureOfExperts,
  note: Note,
  initializer: Initializer,
  database: DatabaseNode,
  workflow: WorkflowNode,
  api: APICall
};