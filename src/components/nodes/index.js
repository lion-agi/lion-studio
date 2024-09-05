import Assistant from './AgentNode';
import ConversationNode from './Conversation';
import DatabaseNode from './DatabaseNode';
import HumanUser from './HumanUser';
import Initializer from './Initializer';
import MixtureOfExperts from './MixtureOfExperts';
import Note from './Note';
import WorkflowNode from './WorkflowNode';

export const nodeTypes = {
  assistant: Assistant,
  conversation: ConversationNode,
  database: DatabaseNode,
  user: HumanUser,
  initializer: Initializer,
  moe: MixtureOfExperts,
  note: Note,
  workflow: WorkflowNode
};