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
import APIEndpoint from './APIEndpoint';
import Email from './Email';
import VoiceCall from './VoiceCall';
import VideoConference from './VideoConference';
import DataTransformation from './DataTransformation';
import DataMerge from './DataMerge';
import DataValidation from './DataValidation';
import NaturalLanguageProcessing from './NaturalLanguageProcessing';
import ImageRecognition from './ImageRecognition';
import PredictiveAnalysis from './PredictiveAnalysis';
import SentimentAnalysis from './SentimentAnalysis';
import ConditionalBranch from './ConditionalBranch';
import Loop from './Loop';
import ParallelExecution from './ParallelExecution';
import ErrorHandler from './ErrorHandler';
import DatabaseQuery from './DatabaseQuery';
import FileOperation from './FileOperation';
import Authentication from './Authentication';
import Timer from './Timer';
import Logger from './Logger';
import VariableManipulation from './VariableManipulation';
import WeatherService from './WeatherService';
import Geolocation from './Geolocation';
import PaymentGateway from './PaymentGateway';
import SMSService from './SMSService';
import SocialMediaIntegration from './SocialMediaIntegration';

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
  apiEndpoint: APIEndpoint,
  email: Email,
  voiceCall: VoiceCall,
  videoConference: VideoConference,
  dataTransformation: DataTransformation,
  dataMerge: DataMerge,
  dataValidation: DataValidation,
  naturalLanguageProcessing: NaturalLanguageProcessing,
  imageRecognition: ImageRecognition,
  predictiveAnalysis: PredictiveAnalysis,
  sentimentAnalysis: SentimentAnalysis,
  conditionalBranch: ConditionalBranch,
  loop: Loop,
  parallelExecution: ParallelExecution,
  errorHandler: ErrorHandler,
  databaseQuery: DatabaseQuery,
  fileOperation: FileOperation,
  authentication: Authentication,
  timer: Timer,
  logger: Logger,
  variableManipulation: VariableManipulation,
  weatherService: WeatherService,
  geolocation: Geolocation,
  paymentGateway: PaymentGateway,
  smsService: SMSService,
  socialMediaIntegration: SocialMediaIntegration,
};