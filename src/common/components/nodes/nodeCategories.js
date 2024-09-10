import { Zap, Bot, User, StickyNote, Database, GitBranch, MessageSquare, Users, Play, Filter, Code, FileText } from 'lucide-react';

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
  'Specialized': [
    { type: 'conversation', label: 'Conversation', icon: MessageSquare },
    { type: 'experts', label: 'Experts', icon: Users },
    { type: 'dataProcessor', label: 'Data Processor', icon: Filter },
    { type: 'documentAnalysis', label: 'Document Analysis', icon: FileText },
  ],
};