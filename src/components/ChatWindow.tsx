import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
}

interface ChatWindowProps {
  title: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ title }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to the chat! How can I help you today?',
      sender: 'system',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    
    // Simulate response after a short delay
    setTimeout(() => {
      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I received your message: "${newMessage}"`,
        sender: 'system',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, systemMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 max-w-[80%] ${
              message.sender === 'user' ? 'ml-auto' : 'mr-auto'
            }`}
          >
            <div 
              className={`p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.text}
            </div>
            <div 
              className={`text-xs text-gray-500 mt-1 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t p-3">
        <div className="flex items-center">
          <textarea
            className="flex-1 border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            rows={2}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button 
            className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none"
            onClick={handleSendMessage}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
