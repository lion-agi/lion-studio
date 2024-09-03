import UserNode from './UserNode';
import AgentNode from './AgentNode';
import AssistantNode from './AssistantNode';
import GroupNode from './GroupNode';
import InitializerNode from './InitializerNode';
import NestedChatNode from './NestedChatNode';
import NoteNode from './NoteNode';

export const nodeTypes = {
  user: UserNode,
  agent: AgentNode,
  assistant: AssistantNode,
  group: GroupNode,
  initializer: InitializerNode,
  nestedChat: NestedChatNode,
  note: NoteNode,
};