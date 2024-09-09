import {
  UserIcon, FileUp, Globe, Database, Mail, FileDown, Brain, Image, Mic, PieChart,
  Languages, CleaningServices, Transform, GitMerge, Filter, AlertTriangle, GitBranch,
  Repeat, SwitchCamera, Zap, Clock, Link, Webhook, TableChart, ChartBar, Dashboard,
  Description, Variable, Functions, StickyNote2, BugReport
} from 'lucide-react';

export const categoryColors = {
  inputOutput: {
    base: "blue-500",
    gradientFrom: "from-blue-500/30",
    gradientTo: "to-blue-400/10"
  },
  aiProcessing: {
    base: "purple-500",
    gradientFrom: "from-purple-500/30",
    gradientTo: "to-purple-400/10"
  },
  dataManipulation: {
    base: "emerald-500",
    gradientFrom: "from-emerald-500/30",
    gradientTo: "to-emerald-400/10"
  },
  logicFlowControl: {
    base: "red-500",
    gradientFrom: "from-red-500/30",
    gradientTo: "to-red-400/10"
  },
  integration: {
    base: "amber-500",
    gradientFrom: "from-amber-500/30",
    gradientTo: "to-amber-400/10"
  },
  visualization: {
    base: "pink-500",
    gradientFrom: "from-pink-500/30",
    gradientTo: "to-pink-400/10"
  },
  utility: {
    base: "gray-500",
    gradientFrom: "from-gray-500/30",
    gradientTo: "to-gray-400/10"
  }
};

export const nodeCategoryMap = {
  userInput: 'inputOutput',
  fileUpload: 'inputOutput',
  apiInput: 'inputOutput',
  databaseInput: 'inputOutput',
  emailOutput: 'inputOutput',
  apiOutput: 'inputOutput',
  fileExport: 'inputOutput',
  textGeneration: 'aiProcessing',
  imageRecognition: 'aiProcessing',
  naturalLanguageProcessing: 'aiProcessing',
  sentimentAnalysis: 'aiProcessing',
  translation: 'aiProcessing',
  dataCleaning: 'dataManipulation',
  dataTransformation: 'dataManipulation',
  dataMerging: 'dataManipulation',
  dataFiltering: 'dataManipulation',
  dataValidation: 'dataManipulation',
  conditionalBranch: 'logicFlowControl',
  loop: 'logicFlowControl',
  switchCase: 'logicFlowControl',
  trigger: 'logicFlowControl',
  delay: 'logicFlowControl',
  apiCall: 'integration',
  webhook: 'integration',
  databaseQuery: 'integration',
  externalServiceIntegration: 'integration',
  chartGeneration: 'visualization',
  dataTable: 'visualization',
  dashboardWidget: 'visualization',
  reportGenerator: 'visualization',
  variableAssignment: 'utility',
  functionSubflow: 'utility',
  commentNote: 'utility',
  debug: 'utility'
};

export const nodeCategories = [
  {
    name: "Input/Output",
    color: categoryColors.inputOutput.base,
    nodes: [
      { type: 'userInput', label: 'User Input', icon: UserIcon },
      { type: 'fileUpload', label: 'File Upload', icon: FileUp },
      { type: 'apiInput', label: 'API Input', icon: Globe },
      { type: 'databaseInput', label: 'Database Input', icon: Database },
      { type: 'emailOutput', label: 'Email Output', icon: Mail },
      { type: 'apiOutput', label: 'API Output', icon: Globe },
      { type: 'fileExport', label: 'File Export', icon: FileDown },
    ]
  },
  {
    name: "AI Processing",
    color: categoryColors.aiProcessing.base,
    nodes: [
      { type: 'textGeneration', label: 'Text Generation', icon: Brain },
      { type: 'imageRecognition', label: 'Image Recognition', icon: Image },
      { type: 'naturalLanguageProcessing', label: 'NLP', icon: Mic },
      { type: 'sentimentAnalysis', label: 'Sentiment Analysis', icon: PieChart },
      { type: 'translation', label: 'Translation', icon: Languages },
    ]
  },
  {
    name: "Data Manipulation",
    color: categoryColors.dataManipulation.base,
    nodes: [
      { type: 'dataCleaning', label: 'Data Cleaning', icon: CleaningServices },
      { type: 'dataTransformation', label: 'Data Transformation', icon: Transform },
      { type: 'dataMerging', label: 'Data Merging', icon: GitMerge },
      { type: 'dataFiltering', label: 'Data Filtering', icon: Filter },
      { type: 'dataValidation', label: 'Data Validation', icon: AlertTriangle },
    ]
  },
  {
    name: "Logic & Flow Control",
    color: categoryColors.logicFlowControl.base,
    nodes: [
      { type: 'conditionalBranch', label: 'Conditional Branch', icon: GitBranch },
      { type: 'loop', label: 'Loop', icon: Repeat },
      { type: 'switchCase', label: 'Switch Case', icon: SwitchCamera },
      { type: 'trigger', label: 'Trigger', icon: Zap },
      { type: 'delay', label: 'Delay', icon: Clock },
    ]
  },
  {
    name: "Integration",
    color: categoryColors.integration.base,
    nodes: [
      { type: 'apiCall', label: 'API Call', icon: Link },
      { type: 'webhook', label: 'Webhook', icon: Webhook },
      { type: 'databaseQuery', label: 'Database Query', icon: Database },
      { type: 'externalServiceIntegration', label: 'External Service', icon: Globe },
    ]
  },
  {
    name: "Visualization",
    color: categoryColors.visualization.base,
    nodes: [
      { type: 'chartGeneration', label: 'Chart Generation', icon: ChartBar },
      { type: 'dataTable', label: 'Data Table', icon: TableChart },
      { type: 'dashboardWidget', label: 'Dashboard Widget', icon: Dashboard },
      { type: 'reportGenerator', label: 'Report Generator', icon: Description },
    ]
  },
  {
    name: "Utility",
    color: categoryColors.utility.base,
    nodes: [
      { type: 'variableAssignment', label: 'Variable Assignment', icon: Variable },
      { type: 'functionSubflow', label: 'Function/Subflow', icon: Functions },
      { type: 'commentNote', label: 'Comment/Note', icon: StickyNote2 },
      { type: 'debug', label: 'Debug', icon: BugReport },
    ]
  },
];