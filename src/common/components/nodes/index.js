import AssistantNode from './AssistantNode';
import HumanUser from './HumanUser';
import MixtureOfExperts from './MixtureOfExperts';
import Note from './Note';
import Initializer from './Initializer';
import DatabaseNode from './DatabaseNode';
import WorkflowNode from './WorkflowNode';
import APICall from './APICall';
import CodeExecution from './CodeExecution';
import Conversation from './Conversation';
import DataProcessor from './DataProcessor';
import DocumentAnalysis from './DocumentAnalysis';
import AIModel from './AIModel';
import Worker from './Worker';
import Tool from './Tool';
import Webhook from './Webhook';
import EventTrigger from './EventTrigger';
import Scheduler from './Scheduler';
import TaskQueue from './TaskQueue';

export const nodeTypes = {
  assistant: AssistantNode,
  user: HumanUser,
  experts: MixtureOfExperts,
  note: Note,
  initializer: Initializer,
  database: DatabaseNode,
  workflow: WorkflowNode,
  apiCall: APICall,
  codeExecution: CodeExecution,
  conversation: Conversation,
  dataProcessor: DataProcessor,
  documentAnalysis: DocumentAnalysis,
  aiModel: AIModel,
  worker: Worker,
  tool: Tool,
  webhook: Webhook,
  eventTrigger: EventTrigger,
  scheduler: Scheduler,
  taskQueue: TaskQueue,
};