import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import AIAvatar from './AIAvatar';
import ChatMessage from './ChatMessage';
import { AIMessage, ChatSession } from '../../types/ai-assistant';

interface AIAssistantProps {
  weatherData?: any;
  professionalData?: any;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ weatherData, professionalData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      content: "Hi! I'm Aria, your personal weather assistant. I can help you with weather insights, professional recommendations, and answer any questions you have. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const message = userMessage.toLowerCase();
    
    // Weather-related responses
    if (message.includes('weather') || message.includes('temperature') || message.includes('rain')) {
      if (weatherData) {
        return `Based on current conditions in ${weatherData.location}, it's ${weatherData.current.temperature}°C with ${weatherData.current.condition.toLowerCase()}. ${weatherData.current.description}. Would you like specific recommendations for your activities today?`;
      }
      return "I'd be happy to help with weather information! Please search for a location first, and I'll provide detailed insights about current conditions and forecasts.";
    }

    // Professional advice
    if (message.includes('commute') || message.includes('work') || message.includes('meeting')) {
      if (professionalData) {
        return `For your professional activities today, I recommend checking the commute impact (${professionalData.commuteImpact.severity} severity) and workability score (${professionalData.workabilityScore.score}/100). Would you like specific recommendations for outdoor work or travel?`;
      }
      return "I can provide professional weather insights including commute impact, workability scores, and travel recommendations. Let me know what specific professional activities you're planning!";
    }

    // Clothing recommendations
    if (message.includes('wear') || message.includes('clothes') || message.includes('dress')) {
      if (weatherData) {
        const temp = weatherData.current.temperature;
        if (temp < 10) {
          return "Given the cool temperature, I recommend wearing warm layers - a coat or heavy jacket, long sleeves, and closed-toe shoes. Don't forget accessories like a scarf or gloves if it's particularly chilly!";
        } else if (temp > 25) {
          return "It's quite warm today! I suggest lightweight, breathable fabrics, short sleeves or light long sleeves, and comfortable shoes. Consider sun protection if you'll be outdoors.";
        } else {
          return "The temperature is pleasant today. Business casual or smart casual attire would work well - perhaps a light jacket you can remove if needed.";
        }
      }
      return "I'd love to help with clothing recommendations! Once you check the weather for your location, I can suggest appropriate attire based on the conditions.";
    }

    // General helpful responses
    const responses = [
      "That's an interesting question! I'm here to help with weather-related insights and professional recommendations. Could you tell me more about what you're planning?",
      "I'd be happy to assist you! As your weather companion, I can provide insights about current conditions, forecasts, and how weather might impact your professional activities.",
      "Great question! I specialize in weather intelligence and professional recommendations. What specific information would be most helpful for your day?",
      "I'm here to help make your day better with weather insights! Whether it's planning your commute, choosing what to wear, or scheduling outdoor activities, I've got you covered.",
      "That's something I can definitely help with! I combine weather data with professional insights to give you actionable recommendations. What would you like to know more about?"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await generateAIResponse(inputMessage);
      
      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input functionality would be implemented here
  };

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
    // Text-to-speech functionality would be implemented here
  };

  const quickActions = [
    "What should I wear today?",
    "How's my commute looking?",
    "Is it good weather for outdoor work?",
    "Should I bring an umbrella?",
    "What's the air quality like?"
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse"
        >
          <MessageCircle size={24} />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          </div>
          <div className="absolute -top-12 right-0 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Chat with Aria
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AIAvatar 
              isTyping={isTyping} 
              isSpeaking={isSpeaking}
              size={isMinimized ? 32 : 40}
            />
            <div className="text-white">
              <h3 className="font-semibold">Aria</h3>
              <p className="text-xs opacity-90">
                {isTyping ? 'Typing...' : 'Your Weather Assistant'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleSpeech}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <AIAvatar isTyping={true} size={32} />
                  <div className="bg-white p-3 rounded-2xl shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="p-4 border-t border-gray-200 bg-white">
                <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(action)}
                      className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors duration-200"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about weather..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={toggleVoiceInput}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isListening 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;