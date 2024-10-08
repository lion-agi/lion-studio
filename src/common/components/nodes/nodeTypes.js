import APICall from './APICall';
import AssistantNode from './AssistantNode';
import HumanUser from './HumanUser';
import Note from './Note';
import DatabaseNode from './DatabaseNode';
import WorkflowNode from './WorkflowNode';
import MixtureOfExperts from './MixtureOfExperts';
import Worker from './Worker';
import Tool from './Tool';
import AIModel from './AIModel';
import TaskQueue from './TaskQueue';
import Scheduler from './Scheduler';
import APIEndpoint from './APIEndpoint';
import Webhook from './Webhook';
import EventTrigger from './EventTrigger';
import CodeExecution from './CodeExecution';
import Conversation from './Conversation';
import DataProcessor from './DataProcessor';
import DocumentAnalysis from './DocumentAnalysis';

export const nodeTypes = {
  apiCall: APICall,
  assistant: AssistantNode,
  user: HumanUser,
  note: Note,
  database: DatabaseNode,
  workflow: WorkflowNode,
  experts: MixtureOfExperts,
  worker: Worker,
  tool: Tool,
  aiModel: AIModel,
  taskQueue: TaskQueue,
  scheduler: Scheduler,
  apiEndpoint: APIEndpoint,
  webhook: Webhook,
  eventTrigger: EventTrigger,
  codeExecution: CodeExecution,
  conversation: Conversation,
  dataProcessor: DataProcessor,
  documentAnalysis: DocumentAnalysis,
};

// Path: src/common/components/nodes/nodeTypes.js