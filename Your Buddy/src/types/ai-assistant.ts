export interface AIMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'weather' | 'recommendation';
  metadata?: {
    weatherData?: any;
    location?: string;
    confidence?: number;
  };
}

export interface ChatSession {
  id: string;
  userId?: string;
  messages: AIMessage[];
  startTime: Date;
  lastActivity: Date;
  context: {
    currentLocation?: string;
    weatherData?: any;
    professionalData?: any;
    userPreferences?: UserPreferences;
  };
}

export interface UserPreferences {
  temperatureUnit: 'celsius' | 'fahrenheit';
  timeFormat: '12h' | '24h';
  notifications: {
    weather: boolean;
    commute: boolean;
    professional: boolean;
  };
  workSchedule?: {
    startTime: string;
    endTime: string;
    workDays: number[];
  };
  commuteInfo?: {
    mode: 'car' | 'public' | 'bike' | 'walk';
    duration: number;
    route?: string;
  };
}

export interface AICapabilities {
  weatherAnalysis: boolean;
  professionalInsights: boolean;
  clothingRecommendations: boolean;
  commuteAdvice: boolean;
  travelPlanning: boolean;
  healthAndSafety: boolean;
  voiceInteraction: boolean;
  multiLanguage: boolean;
}

export interface AIPersonality {
  name: string;
  traits: string[];
  responseStyle: 'professional' | 'friendly' | 'casual' | 'expert';
  expertise: string[];
}

export interface ConversationContext {
  topic: string;
  intent: 'question' | 'request' | 'complaint' | 'compliment' | 'general';
  entities: {
    location?: string;
    time?: string;
    weather?: string;
    activity?: string;
  };
  sentiment: 'positive' | 'neutral' | 'negative';
}