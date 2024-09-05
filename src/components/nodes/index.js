import UserNode from './UserNode';
import AgentNode from './AgentNode';
import AssistantNode from './AssistantNode';
import MixtureOfExpertsNode from './MixtureOfExpertsNode';
import InitializerNode from './InitializerNode';
import NestedChatNode from './NestedChatNode';
import NoteNode from './NoteNode';
import ApiNode from './ApiNode';
import WorkflowNode from './WorkflowNode';
import DatabaseNode from './DatabaseNode';

export const nodeTypes = {
  user: UserNode,
  agent: AgentNode,
  assistant: AssistantNode,
  mixtureOfExperts: MixtureOfExpertsNode,
  initializer: InitializerNode,
  nestedChat: NestedChatNode,
  note: NoteNode,
  api: ApiNode,
  workflow: WorkflowNode,
  database: DatabaseNode,
};