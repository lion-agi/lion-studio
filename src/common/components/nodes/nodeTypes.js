import APICall from './nodes/APICall';
import AssistantNode from './nodes/AssistantNode';
import UserNode from './nodes/UserNode';
import NoteNode from './nodes/NoteNode';
import DatabaseNode from './nodes/DatabaseNode';
import WorkflowNode from './nodes/WorkflowNode';
import ConversationNode from './nodes/ConversationNode';
import ExpertsNode from './nodes/ExpertsNode';

export const nodeTypes = {
  apiCall: APICall,
  assistant: AssistantNode,
  user: UserNode,
  note: NoteNode,
  database: DatabaseNode,
  workflow: WorkflowNode,
  conversation: ConversationNode,
  experts: ExpertsNode,
};