import React, { useState, useEffect, useRef } from 'react';
import { sendMessage } from '../services/chatService';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const notificationSound = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialize audio with preload
    const audio = new Audio('/notification.mp3');
    audio.preload = 'auto';
    audio.volume = 0.5;
    notificationSound.current = audio;
    
    const handleCanPlayThrough = () => {
      setAudioLoaded(true);
    };

    notificationSound.current.addEventListener('canplaythrough', handleCanPlayThrough);
    notificationSound.current.load();

    // Send initial greeting with sound
    const sendInitialGreeting = async () => {
      setIsTyping(true);
      try {
        const response = await sendMessage('Salut! Sunt asistentul tău virtual. Cum te pot ajuta astăzi?');
        setMessages([{ text: response.message, sender: 'bot' }]);
        setUnreadCount(1);
        // Play sound only once for initial greeting
        if (audioLoaded && notificationSound.current) {
          notificationSound.current.play().catch(console.error);
        }
      } catch (error) {
        console.error('Error sending initial greeting:', error);
      } finally {
        setIsTyping(false);
      }
    };

    sendInitialGreeting();

    return () => {
      if (notificationSound.current) {
        notificationSound.current.removeEventListener('canplaythrough', handleCanPlayThrough);
      }
    };
  }, []);

  const toggleChat = () => {
    setHasInteracted(true);
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMessage = { text: currentMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      const response = await sendMessage(currentMessage);
      setMessages(prev => [...prev, { text: response.message, sender: 'bot' }]);
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        text: 'Ne pare rău, a apărut o eroare. Vă rugăm să încercați din nou.', 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={toggleChat}>
        <span className="chat-icon">💬</span>
        {unreadCount > 0 && !isOpen && (
          <span className="unread-indicator">{unreadCount}</span>
        )}
      </button>

      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3>Asistent Chat</h3>
          <button className="close-button" onClick={toggleChat}>×</button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chatbot-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit" disabled={isTyping}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot; 