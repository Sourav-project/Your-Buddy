import { ProfessionalWeatherData, CommuteImpact, WorkabilityScore, TravelImpact, ClothingRecommendation, AirQualityData, PollenData, IndustryOverlay } from '../types/professional';
import { WeatherData } from '../types/weather';

export const calculateCommuteImpact = (weatherData: WeatherData): CommuteImpact => {
  const { current, hourly } = weatherData;
  let severity: CommuteImpact['severity'] = 'low';
  let delayMinutes = 0;
  const recommendations: string[] = [];
  const affectedRoutes: string[] = [];

  // Analyze precipitation impact
  if (current.condition.includes('Rain') || current.condition.includes('Snow')) {
    const precipitationLevel = weatherData.daily[0].precipitation;
    if (precipitationLevel > 70) {
      severity = 'severe';
      delayMinutes = 45;
      recommendations.push('Consider working from home if possible');
      recommendations.push('Allow 45+ minutes extra travel time');
      affectedRoutes.push('All major highways', 'Public transportation');
    } else if (precipitationLevel > 40) {
      severity = 'high';
      delayMinutes = 25;
      recommendations.push('Leave 25-30 minutes earlier');
      recommendations.push('Check traffic updates before leaving');
    } else if (precipitationLevel > 15) {
      severity = 'moderate';
      delayMinutes = 15;
      recommendations.push('Allow extra 15 minutes for commute');
    }
  }

  // Analyze wind impact
  if (current.windSpeed > 40) {
    severity = severity === 'low' ? 'high' : severity;
    delayMinutes = Math.max(delayMinutes, 20);
    recommendations.push('Avoid bridges and elevated highways');
    recommendations.push('Secure loose items in vehicle');
    affectedRoutes.push('Bridges', 'Elevated highways');
  }

  // Analyze visibility
  if (current.visibility < 5) {
    severity = 'high';
    delayMinutes = Math.max(delayMinutes, 30);
    recommendations.push('Drive with headlights on');
    recommendations.push('Maintain safe following distance');
  }

  // Temperature extremes
  if (current.temperature < -10 || current.temperature > 40) {
    severity = severity === 'low' ? 'moderate' : severity;
    recommendations.push('Allow extra time for vehicle warm-up/cool-down');
  }

  return {
    severity,
    delayMinutes,
    description: `${severity.charAt(0).toUpperCase() + severity.slice(1)} impact expected on commute`,
    recommendations,
    affectedRoutes
  };
};

export const calculateWorkabilityScore = (weatherData: WeatherData): WorkabilityScore => {
  const { current } = weatherData;
  let score = 100;
  const factors = {
    temperature: 0,
    windChill: 0,
    heatIndex: 0,
    precipitation: 0,
    wind: 0,
    visibility: 0
  };
  const recommendations: string[] = [];

  // Temperature factor
  if (current.temperature < 0) {
    factors.temperature = -30;
    score += factors.temperature;
    recommendations.push('Extreme cold - limit outdoor exposure');
    recommendations.push('Wear insulated protective gear');
  } else if (current.temperature < 5) {
    factors.temperature = -20;
    score += factors.temperature;
    recommendations.push('Cold conditions - dress warmly');
  } else if (current.temperature > 35) {
    factors.temperature = -25;
    score += factors.temperature;
    recommendations.push('Extreme heat - take frequent breaks');
    recommendations.push('Stay hydrated and seek shade');
  } else if (current.temperature > 30) {
    factors.temperature = -15;
    score += factors.temperature;
    recommendations.push('Hot conditions - limit strenuous activity');
  }

  // Wind factor
  if (current.windSpeed > 50) {
    factors.wind = -40;
    score += factors.wind;
    recommendations.push('Dangerous wind conditions - avoid outdoor work');
  } else if (current.windSpeed > 30) {
    factors.wind = -20;
    score += factors.wind;
    recommendations.push('Strong winds - secure equipment and materials');
  } else if (current.windSpeed > 20) {
    factors.wind = -10;
    score += factors.wind;
    recommendations.push('Moderate winds - be cautious with lightweight materials');
  }

  // Precipitation factor
  const precipitation = weatherData.daily[0].precipitation;
  if (precipitation > 80) {
    factors.precipitation = -35;
    score += factors.precipitation;
    recommendations.push('Heavy precipitation - postpone outdoor work if possible');
  } else if (precipitation > 50) {
    factors.precipitation = -20;
    score += factors.precipitation;
    recommendations.push('Moderate precipitation - use protective covers');
  } else if (precipitation > 20) {
    factors.precipitation = -10;
    score += factors.precipitation;
    recommendations.push('Light precipitation expected - have backup plans');
  }

  // Visibility factor
  if (current.visibility < 2) {
    factors.visibility = -30;
    score += factors.visibility;
    recommendations.push('Poor visibility - use additional lighting');
  } else if (current.visibility < 5) {
    factors.visibility = -15;
    score += factors.visibility;
    recommendations.push('Reduced visibility - exercise extra caution');
  }

  score = Math.max(0, Math.min(100, score));

  let category: WorkabilityScore['category'];
  if (score >= 80) category = 'excellent';
  else if (score >= 60) category = 'good';
  else if (score >= 40) category = 'fair';
  else if (score >= 20) category = 'poor';
  else category = 'hazardous';

  return {
    score,
    category,
    factors,
    recommendations
  };
};

export const calculateTravelImpact = (weatherData: WeatherData): TravelImpact => {
  const { current, daily } = weatherData;
  let flightDelayRisk: TravelImpact['flightDelayRisk'] = 'low';
  let roadConditions: TravelImpact['roadConditions'] = 'excellent';
  let publicTransportImpact: TravelImpact['publicTransportImpact'] = 'minimal';
  const recommendations: string[] = [];

  // Flight delay risk
  if (current.condition.includes('Thunderstorm') || current.windSpeed > 40) {
    flightDelayRisk = 'high';
    recommendations.push('Check flight status frequently');
    recommendations.push('Consider travel insurance');
  } else if (current.condition.includes('Rain') || current.condition.includes('Snow')) {
    flightDelayRisk = 'moderate';
    recommendations.push('Arrive at airport early');
  }

  // Road conditions
  if (current.condition.includes('Snow') || current.temperature < 0) {
    roadConditions = 'poor';
    recommendations.push('Use winter tires or chains');
    recommendations.push('Drive slowly and maintain safe distance');
  } else if (current.condition.includes('Rain') && daily[0].precipitation > 50) {
    roadConditions = 'fair';
    recommendations.push('Reduce speed in wet conditions');
  }

  // Public transport impact
  if (current.condition.includes('Snow') || current.windSpeed > 30) {
    publicTransportImpact = 'significant';
    recommendations.push('Check public transport updates');
    recommendations.push('Have alternative transport options ready');
  } else if (current.condition.includes('Rain')) {
    publicTransportImpact = 'moderate';
    recommendations.push('Allow extra time for delays');
  }

  return {
    flightDelayRisk,
    roadConditions,
    publicTransportImpact,
    recommendations
  };
};

export const generateClothingRecommendations = (weatherData: WeatherData): ClothingRecommendation[] => {
  const { current, daily } = weatherData;
  const recommendations: ClothingRecommendation[] = [];

  // Formal/Business attire
  const formal: ClothingRecommendation = {
    category: 'formal',
    items: [],
    accessories: [],
    footwear: [],
    notes: []
  };

  if (current.temperature < 10) {
    formal.items.push('Wool suit or heavy blazer', 'Long-sleeve dress shirt', 'Warm undergarments');
    formal.accessories.push('Wool coat or overcoat', 'Scarf', 'Gloves');
    formal.footwear.push('Closed-toe leather shoes', 'Warm socks');
  } else if (current.temperature < 20) {
    formal.items.push('Business suit', 'Long-sleeve shirt');
    formal.accessories.push('Light jacket or blazer');
    formal.footwear.push('Dress shoes');
  } else if (current.temperature < 30) {
    formal.items.push('Lightweight suit', 'Dress shirt');
    formal.footwear.push('Breathable dress shoes');
  } else {
    formal.items.push('Lightweight suit', 'Short-sleeve dress shirt');
    formal.accessories.push('Portable fan', 'Cooling towel');
    formal.footwear.push('Breathable dress shoes');
    formal.notes.push('Consider indoor meetings during peak heat');
  }

  if (daily[0].precipitation > 30) {
    formal.accessories.push('Umbrella', 'Waterproof coat');
    formal.footwear.push('Water-resistant shoes');
  }

  recommendations.push(formal);

  // Outdoor work attire
  const outdoor: ClothingRecommendation = {
    category: 'outdoor-work',
    items: [],
    accessories: [],
    footwear: [],
    notes: []
  };

  if (current.temperature < 0) {
    outdoor.items.push('Insulated work jacket', 'Thermal layers', 'Insulated pants');
    outdoor.accessories.push('Insulated gloves', 'Warm hat', 'Face protection');
    outdoor.footwear.push('Insulated work boots', 'Warm socks');
    outdoor.notes.push('Limit outdoor exposure time');
  } else if (current.temperature > 30) {
    outdoor.items.push('Lightweight work shirt', 'Moisture-wicking clothing');
    outdoor.accessories.push('Wide-brim hat', 'Sunglasses', 'Cooling vest');
    outdoor.footwear.push('Breathable work boots');
    outdoor.notes.push('Take frequent shade breaks', 'Stay hydrated');
  }

  if (current.windSpeed > 20) {
    outdoor.accessories.push('Secure hat or helmet', 'Wind-resistant jacket');
  }

  recommendations.push(outdoor);

  return recommendations;
};

export const generateMockAirQuality = (): AirQualityData => {
  const aqi = Math.floor(Math.random() * 200) + 1;
  let category: AirQualityData['category'];
  const healthRecommendations: string[] = [];

  if (aqi <= 50) {
    category = 'good';
    healthRecommendations.push('Air quality is satisfactory for outdoor activities');
  } else if (aqi <= 100) {
    category = 'moderate';
    healthRecommendations.push('Sensitive individuals should consider limiting outdoor activities');
  } else if (aqi <= 150) {
    category = 'unhealthy-sensitive';
    healthRecommendations.push('Sensitive groups should avoid outdoor activities');
    healthRecommendations.push('Consider wearing a mask outdoors');
  } else if (aqi <= 200) {
    category = 'unhealthy';
    healthRecommendations.push('Everyone should limit outdoor activities');
    healthRecommendations.push('Wear N95 mask when outdoors');
  } else {
    category = 'very-unhealthy';
    healthRecommendations.push('Avoid all outdoor activities');
    healthRecommendations.push('Keep windows closed and use air purifiers');
  }

  return {
    aqi,
    category,
    pollutants: {
      pm25: Math.floor(Math.random() * 100),
      pm10: Math.floor(Math.random() * 150),
      o3: Math.floor(Math.random() * 200),
      no2: Math.floor(Math.random() * 100),
      so2: Math.floor(Math.random() * 50),
      co: Math.floor(Math.random() * 10)
    },
    healthRecommendations
  };
};

export const generateMockPollenData = (): PollenData => {
  const overall = Math.floor(Math.random() * 10) + 1;
  let category: PollenData['category'];
  const recommendations: string[] = [];

  if (overall <= 2) {
    category = 'low';
    recommendations.push('Low pollen levels - minimal allergy risk');
  } else if (overall <= 5) {
    category = 'moderate';
    recommendations.push('Moderate pollen levels - sensitive individuals may experience symptoms');
    recommendations.push('Consider taking allergy medication');
  } else if (overall <= 8) {
    category = 'high';
    recommendations.push('High pollen levels - limit outdoor activities');
    recommendations.push('Keep windows closed and use air conditioning');
  } else {
    category = 'very-high';
    recommendations.push('Very high pollen levels - avoid outdoor activities');
    recommendations.push('Shower and change clothes after being outdoors');
  }

  return {
    overall,
    tree: Math.floor(Math.random() * 10) + 1,
    grass: Math.floor(Math.random() * 10) + 1,
    weed: Math.floor(Math.random() * 10) + 1,
    category,
    recommendations
  };
};

export const getProfessionalWeatherData = (weatherData: WeatherData): ProfessionalWeatherData => {
  const commuteImpact = calculateCommuteImpact(weatherData);
  const workabilityScore = calculateWorkabilityScore(weatherData);
  const travelImpact = calculateTravelImpact(weatherData);
  const clothingRecommendations = generateClothingRecommendations(weatherData);
  const airQuality = generateMockAirQuality();
  const pollen = generateMockPollenData();

  return {
    commuteImpact,
    workabilityScore,
    travelImpact,
    clothingRecommendations,
    airQuality,
    pollen,
    industryOverlays: [],
    uvExposure: {
      index: weatherData.current.uvIndex,
      category: weatherData.current.uvIndex > 8 ? 'Very High' : 
                weatherData.current.uvIndex > 6 ? 'High' :
                weatherData.current.uvIndex > 3 ? 'Moderate' : 'Low',
      safeExposureTime: Math.max(10, 60 - (weatherData.current.uvIndex * 5)),
      recommendations: weatherData.current.uvIndex > 6 ? 
        ['Wear sunscreen SPF 30+', 'Seek shade during peak hours', 'Wear protective clothing'] :
        ['Minimal sun protection needed']
    },
    optimalWorkingConditions: {
      indoor: {
        temperature: 22,
        humidity: 45,
        comfort: weatherData.current.temperature >= 20 && weatherData.current.temperature <= 26 ? 'excellent' : 'good',
        recommendations: weatherData.current.temperature > 26 ? 
          ['Increase air conditioning', 'Ensure proper ventilation'] :
          weatherData.current.temperature < 20 ?
          ['Increase heating', 'Consider warm beverages'] :
          ['Optimal indoor conditions']
      },
      outdoor: {
        comfort: workabilityScore.category === 'excellent' ? 'excellent' :
                workabilityScore.category === 'good' ? 'good' :
                workabilityScore.category === 'fair' ? 'fair' : 'poor',
        productivity: workabilityScore.score,
        recommendations: workabilityScore.recommendations
      }
    }
  };
};