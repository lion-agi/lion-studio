import HumanUser from './UserNode';
import Assistant from './AgentNode';
import AssistantNode from './AssistantNode';
import GroupNode from './GroupNode';
import Initializer from './InitializerNode';
import NestedChatNode from './NestedChatNode';
import NoteNode from './NoteNode';
import APICall from './ApiNode';
import WorkflowNode from './WorkflowNode';
import DatabaseNode from './DatabaseNode';

export const nodeTypes = {
  user: HumanUser,
  agent: Assistant,
  assistant: AssistantNode,
  group: GroupNode,
  initializer: Initializer,
  nestedChat: NestedChatNode,
  note: NoteNode,
  api: APICall,
  workflow: WorkflowNode,
  database: DatabaseNode,
};