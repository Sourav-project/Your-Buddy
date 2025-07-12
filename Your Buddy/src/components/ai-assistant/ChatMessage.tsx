import React from 'react';
import { AIMessage } from '../../types/ai-assistant';
import AIAvatar from './AIAvatar';
import { User } from 'lucide-react';

interface ChatMessageProps {
  message: AIMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAI = message.sender === 'ai';
  
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} items-start space-x-2`}>
      {isAI && <AIAvatar size={32} />}
      
      <div className={`max-w-[80%] ${isAI ? 'order-2' : 'order-1'}`}>
        <div
          className={`p-3 rounded-2xl shadow-sm ${
            isAI
              ? 'bg-white text-gray-800 rounded-bl-sm'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        
        <div className={`mt-1 text-xs text-gray-500 ${isAI ? 'text-left' : 'text-right'}`}>
          {message.timestamp.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
      
      {!isAI && (
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center order-2">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;