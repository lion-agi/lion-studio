import { Zap, Bot, User, StickyNote, Database, GitBranch, MessageSquare, Users, Play, Filter, Code, FileText, Briefcase, Brain, Cog, Cpu, Network, Layers, Wrench } from 'lucide-react';
import BaseNode from './BaseNode';

export const nodeCategories = [
  {
    name: 'Basic',
    nodes: [
      { type: 'user', label: 'User', icon: User, component: BaseNode },
      { type: 'assistant', label: 'Assistant', icon: Bot, component: BaseNode },
      { type: 'note', label: 'Note', icon: StickyNote, component: BaseNode },
      { type: 'initializer', label: 'Initializer', icon: Play, component: BaseNode },
    ]
  },
  {
    name: 'Advanced',
    nodes: [
      { type: 'apiCall', label: 'API Call', icon: Zap, component: BaseNode },
      { type: 'database', label: 'Database', icon: Database, component: BaseNode },
      { type: 'workflow', label: 'Workflow', icon: GitBranch, component: BaseNode },
      { type: 'codeExecution', label: 'Code Execution', icon: Code, component: BaseNode },
    ]
  },
  {
    name: 'AI & Processing',
    nodes: [
      { type: 'conversation', label: 'Conversation', icon: MessageSquare, component: BaseNode },
      { type: 'experts', label: 'Experts', icon: Users, component: BaseNode },
      { type: 'dataProcessor', label: 'Data Processor', icon: Filter, component: BaseNode },
      { type: 'documentAnalysis', label: 'Document Analysis', icon: FileText, component: BaseNode },
      { type: 'aiModel', label: 'AI Model', icon: Brain, component: BaseNode },
    ]
  },
  {
    name: 'Tools & Workers',
    nodes: [
      { type: 'worker', label: 'Worker', icon: Briefcase, component: BaseNode },
      { type: 'tool', label: 'Tool', icon: Wrench, component: BaseNode },
      { type: 'taskQueue', label: 'Task Queue', icon: Layers, component: BaseNode },
      { type: 'scheduler', label: 'Scheduler', icon: Cog, component: BaseNode },
    ]
  },
  {
    name: 'Integration',
    nodes: [
      { type: 'apiEndpoint', label: 'API Endpoint', icon: Network, component: BaseNode },
      { type: 'webhook', label: 'Webhook', icon: Zap, component: BaseNode },
      { type: 'eventTrigger', label: 'Event Trigger', icon: Cpu, component: BaseNode },
    ]
  },
];