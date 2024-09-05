import Assistant from './AgentNode';
import Conversation from './Conversation';
import Database from './DatabaseNode';
import HumanUser from './HumanUser';
import Initializer from './Initializer';
import MixtureOfExperts from './MixtureOfExperts';
import Note from './Note';
import Workflow from './WorkflowNode';


export const nodeTypes = {
  assistant: Assistant,
  conversation: Conversation,
  database: Database,
  user: HumanUser,
  initializer: Initializer,
  moe: MixtureOfExperts,
  note: Note,
  workflow: Workflow
};