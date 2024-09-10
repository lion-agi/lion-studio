import { 
  MessageSquare, Bot, User, StickyNote, Play, Database, GitBranch, 
  Zap, Filter, Code, FileText, Briefcase, Brain, Cog, Cpu, Network, 
  Layers, Wrench, Globe, Workflow, FileInput, FileOutput, Shuffle,
  Repeat, GitMerge, Sliders, AlertTriangle, BarChart, PieChart, Share2,
  Mail, Phone, Video, Mic, Image, Folder, Lock, Key, Search, Paperclip,
  Calendar, Clock, Compass, Map, Thermometer, CloudRain, Wind, Sun,
  CreditCard
} from 'lucide-react';

export const nodeCategories = [
  {
    name: "Communication",
    color: "#4299E1",
    nodes: [
      { type: 'conversation', label: 'Conversation', icon: MessageSquare, baseColor: "#4299E1", gradientFrom: "from-blue-500/30", gradientTo: "to-blue-400/10" },
      { type: 'assistant', label: 'Assistant', icon: Bot, baseColor: "#3182CE", gradientFrom: "from-blue-600/30", gradientTo: "to-blue-500/10" },
      { type: 'user', label: 'User', icon: User, baseColor: "#2B6CB0", gradientFrom: "from-blue-700/30", gradientTo: "to-blue-600/10" },
      { type: 'email', label: 'Email', icon: Mail, baseColor: "#2C5282", gradientFrom: "from-blue-800/30", gradientTo: "to-blue-700/10" },
      { type: 'voiceCall', label: 'Voice Call', icon: Phone, baseColor: "#2A4365", gradientFrom: "from-blue-900/30", gradientTo: "to-blue-800/10" },
      { type: 'videoConference', label: 'Video Conference', icon: Video, baseColor: "#1A365D", gradientFrom: "from-blue-950/30", gradientTo: "to-blue-900/10" },
    ]
  },
  {
    name: "Data Processing",
    color: "#48BB78",
    nodes: [
      { type: 'dataProcessor', label: 'Data Processor', icon: Filter, baseColor: "#48BB78", gradientFrom: "from-green-500/30", gradientTo: "to-green-400/10" },
      { type: 'documentAnalysis', label: 'Document Analysis', icon: FileText, baseColor: "#38A169", gradientFrom: "from-green-600/30", gradientTo: "to-green-500/10" },
      { type: 'dataTransformation', label: 'Data Transformation', icon: Shuffle, baseColor: "#2F855A", gradientFrom: "from-green-700/30", gradientTo: "to-green-600/10" },
      { type: 'dataMerge', label: 'Data Merge', icon: GitMerge, baseColor: "#276749", gradientFrom: "from-green-800/30", gradientTo: "to-green-700/10" },
      { type: 'dataValidation', label: 'Data Validation', icon: AlertTriangle, baseColor: "#22543D", gradientFrom: "from-green-900/30", gradientTo: "to-green-800/10" },
    ]
  },
  {
    name: "AI & Machine Learning",
    color: "#9F7AEA",
    nodes: [
      { type: 'aiModel', label: 'AI Model', icon: Brain, baseColor: "#9F7AEA", gradientFrom: "from-purple-500/30", gradientTo: "to-purple-400/10" },
      { type: 'naturalLanguageProcessing', label: 'NLP', icon: Mic, baseColor: "#805AD5", gradientFrom: "from-purple-600/30", gradientTo: "to-purple-500/10" },
      { type: 'imageRecognition', label: 'Image Recognition', icon: Image, baseColor: "#6B46C1", gradientFrom: "from-purple-700/30", gradientTo: "to-purple-600/10" },
      { type: 'predictiveAnalysis', label: 'Predictive Analysis', icon: BarChart, baseColor: "#553C9A", gradientFrom: "from-purple-800/30", gradientTo: "to-purple-700/10" },
      { type: 'sentimentAnalysis', label: 'Sentiment Analysis', icon: PieChart, baseColor: "#44337A", gradientFrom: "from-purple-900/30", gradientTo: "to-purple-800/10" },
    ]
  },
  {
    name: "Workflow Control",
    color: "#ED8936",
    nodes: [
      { type: 'initializer', label: 'Initializer', icon: Play, baseColor: "#ED8936", gradientFrom: "from-orange-500/30", gradientTo: "to-orange-400/10" },
      { type: 'conditionalBranch', label: 'Conditional Branch', icon: GitBranch, baseColor: "#DD6B20", gradientFrom: "from-orange-600/30", gradientTo: "to-orange-500/10" },
      { type: 'loop', label: 'Loop', icon: Repeat, baseColor: "#C05621", gradientFrom: "from-orange-700/30", gradientTo: "to-orange-600/10" },
      { type: 'parallelExecution', label: 'Parallel Execution', icon: Layers, baseColor: "#9C4221", gradientFrom: "from-orange-800/30", gradientTo: "to-orange-700/10" },
      { type: 'errorHandler', label: 'Error Handler', icon: AlertTriangle, baseColor: "#7B341E", gradientFrom: "from-orange-900/30", gradientTo: "to-orange-800/10" },
    ]
  },
  {
    name: "Integration & APIs",
    color: "#F687B3",
    nodes: [
      { type: 'apiCall', label: 'API Call', icon: Zap, baseColor: "#F687B3", gradientFrom: "from-pink-500/30", gradientTo: "to-pink-400/10" },
      { type: 'webhook', label: 'Webhook', icon: Share2, baseColor: "#ED64A6", gradientFrom: "from-pink-600/30", gradientTo: "to-pink-500/10" },
      { type: 'databaseQuery', label: 'Database Query', icon: Database, baseColor: "#D53F8C", gradientFrom: "from-pink-700/30", gradientTo: "to-pink-600/10" },
      { type: 'fileOperation', label: 'File Operation', icon: Folder, baseColor: "#B83280", gradientFrom: "from-pink-800/30", gradientTo: "to-pink-700/10" },
      { type: 'authentication', label: 'Authentication', icon: Lock, baseColor: "#97266D", gradientFrom: "from-pink-900/30", gradientTo: "to-pink-800/10" },
    ]
  },
  {
    name: "Utility",
    color: "#4FD1C5",
    nodes: [
      { type: 'note', label: 'Note', icon: StickyNote, baseColor: "#4FD1C5", gradientFrom: "from-teal-500/30", gradientTo: "to-teal-400/10" },
      { type: 'timer', label: 'Timer', icon: Clock, baseColor: "#38B2AC", gradientFrom: "from-teal-600/30", gradientTo: "to-teal-500/10" },
      { type: 'scheduler', label: 'Scheduler', icon: Calendar, baseColor: "#319795", gradientFrom: "from-teal-700/30", gradientTo: "to-teal-600/10" },
      { type: 'logger', label: 'Logger', icon: Paperclip, baseColor: "#2C7A7B", gradientFrom: "from-teal-800/30", gradientTo: "to-teal-700/10" },
      { type: 'variableManipulation', label: 'Variable Manipulation', icon: Sliders, baseColor: "#285E61", gradientFrom: "from-teal-900/30", gradientTo: "to-teal-800/10" },
    ]
  },
  {
    name: "External Services",
    color: "#FC8181",
    nodes: [
      { type: 'weatherService', label: 'Weather Service', icon: CloudRain, baseColor: "#FC8181", gradientFrom: "from-red-500/30", gradientTo: "to-red-400/10" },
      { type: 'geolocation', label: 'Geolocation', icon: Map, baseColor: "#F56565", gradientFrom: "from-red-600/30", gradientTo: "to-red-500/10" },
      { type: 'paymentGateway', label: 'Payment Gateway', icon: CreditCard, baseColor: "#E53E3E", gradientFrom: "from-red-700/30", gradientTo: "to-red-600/10" },
      { type: 'smsService', label: 'SMS Service', icon: MessageSquare, baseColor: "#C53030", gradientFrom: "from-red-800/30", gradientTo: "to-red-700/10" },
      { type: 'socialMediaIntegration', label: 'Social Media Integration', icon: Share2, baseColor: "#9B2C2C", gradientFrom: "from-red-900/30", gradientTo: "to-red-800/10" },
    ]
  },
];
