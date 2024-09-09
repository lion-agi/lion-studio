import { Zap, Bot, User, StickyNote, Database, GitBranch, MessageSquare, Users, Play, Filter, Code, FileText, Tool, Briefcase, Brain, Cog, Cpu, Network, Layers } from 'lucide-react';

export const nodeCategories = {
  'Basic': [
    { type: 'user', label: 'User', icon: User },
    { type: 'assistant', label: 'Assistant', icon: Bot },
    { type: 'note', label: 'Note', icon: StickyNote },
    { type: 'initializer', label: 'Initializer', icon: Play },
  ],
  'Advanced': [
    { type: 'apiCall', label: 'API Call', icon: Zap },
    { type: 'database', label: 'Database', icon: Database },
    { type: 'workflow', label: 'Workflow', icon: GitBranch },
    { type: 'codeExecution', label: 'Code Execution', icon: Code },
  ],
  'AI & Processing': [
    { type: 'conversation', label: 'Conversation', icon: MessageSquare },
    { type: 'experts', label: 'Experts', icon: Users },
    { type: 'dataProcessor', label: 'Data Processor', icon: Filter },
    { type: 'documentAnalysis', label: 'Document Analysis', icon: FileText },
    { type: 'aiModel', label: 'AI Model', icon: Brain },
  ],
  'Tools & Workers': [
    { type: 'worker', label: 'Worker', icon: Briefcase },
    { type: 'tool', label: 'Tool', icon: Tool },
    { type: 'taskQueue', label: 'Task Queue', icon: Layers },
    { type: 'scheduler', label: 'Scheduler', icon: Cog },
  ],
  'Integration': [
    { type: 'apiEndpoint', label: 'API Endpoint', icon: Network },
    { type: 'webhook', label: 'Webhook', icon: Zap },
    { type: 'eventTrigger', label: 'Event Trigger', icon: Cpu },
  ],
};