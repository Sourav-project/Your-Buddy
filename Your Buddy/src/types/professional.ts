export interface BusinessLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  timezone: string;
  type: 'office' | 'site' | 'client' | 'event' | 'warehouse' | 'other';
  isActive: boolean;
}

export interface CommuteImpact {
  severity: 'low' | 'moderate' | 'high' | 'severe';
  delayMinutes: number;
  description: string;
  recommendations: string[];
  affectedRoutes: string[];
}

export interface WorkabilityScore {
  score: number; // 0-100
  category: 'excellent' | 'good' | 'fair' | 'poor' | 'hazardous';
  factors: {
    temperature: number;
    windChill: number;
    heatIndex: number;
    precipitation: number;
    wind: number;
    visibility: number;
  };
  recommendations: string[];
}

export interface TravelImpact {
  flightDelayRisk: 'low' | 'moderate' | 'high';
  roadConditions: 'excellent' | 'good' | 'fair' | 'poor' | 'hazardous';
  publicTransportImpact: 'minimal' | 'moderate' | 'significant' | 'severe';
  recommendations: string[];
}

export interface CustomAlert {
  id: string;
  name: string;
  parameter: 'temperature' | 'wind' | 'precipitation' | 'humidity' | 'pressure' | 'uv';
  condition: 'above' | 'below' | 'equals';
  threshold: number;
  isActive: boolean;
  locations: string[];
}

export interface ClothingRecommendation {
  category: 'formal' | 'business-casual' | 'outdoor-work' | 'travel';
  items: string[];
  accessories: string[];
  footwear: string[];
  notes: string[];
}

export interface AirQualityData {
  aqi: number;
  category: 'good' | 'moderate' | 'unhealthy-sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous';
  pollutants: {
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
    so2: number;
    co: number;
  };
  healthRecommendations: string[];
}

export interface PollenData {
  overall: number;
  tree: number;
  grass: number;
  weed: number;
  category: 'low' | 'moderate' | 'high' | 'very-high';
  recommendations: string[];
}

export interface IndustryOverlay {
  type: 'agriculture' | 'construction' | 'logistics' | 'events' | 'energy';
  data: {
    [key: string]: any;
  };
  alerts: string[];
  recommendations: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  isOutdoor: boolean;
  weatherSensitive: boolean;
}

export interface ProfessionalWeatherData {
  commuteImpact: CommuteImpact;
  workabilityScore: WorkabilityScore;
  travelImpact: TravelImpact;
  clothingRecommendations: ClothingRecommendation[];
  airQuality: AirQualityData;
  pollen: PollenData;
  industryOverlays: IndustryOverlay[];
  uvExposure: {
    index: number;
    category: string;
    safeExposureTime: number;
    recommendations: string[];
  };
  optimalWorkingConditions: {
    indoor: {
      temperature: number;
      humidity: number;
      comfort: 'excellent' | 'good' | 'fair' | 'poor';
      recommendations: string[];
    };
    outdoor: {
      comfort: 'excellent' | 'good' | 'fair' | 'poor';
      productivity: number; // 0-100
      recommendations: string[];
    };
  };
}