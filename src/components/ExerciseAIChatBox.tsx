import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './ExerciseAIChatBox.css';
// import { sendMessage } from '../services/api';  //实际API
import { sendMessage } from '../services/test-api';  // 测试API
import DOMPurify from 'dompurify';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const ExerciseAIChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your Exercise Guidance AI assistant. How can I help you with fitness and workout today?",
      sender: 'ai'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [isInitialState, setIsInitialState] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const recommendedQuestions = [
    {
      title: "Beginner's Guide",
      questions: [
        "What exercises are suitable for beginners?",
        "How do I start a workout routine?",
       
      ]
    },
    {
      title: "Exercise Plans",
      questions: [
        "How to create a personalized workout plan?",
        "How many times should I exercise per week?",
      
      ]
    },
    {
      title: "Health Advice",
      questions: [
        "How to recover after a workout?",
        "What diet best complements exercise?",
      
      ]
    }
  ];

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const typeMessage = async (text: string, callback: (text: string) => void) => {
    setIsTyping(true);
    const words = text.split(' ');
    let currentText = '';
    
    for (let word of words) {
      currentText += word + ' ';
      callback(currentText.trim());
      await new Promise(resolve => setTimeout(resolve, 30));
    }
    setIsTyping(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: input,
      sender: 'user'
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');

    try {
      setIsTyping(true);
      setShowRecommendations(false);
      setIsInitialState(false);
      const tempMessage: Message = { text: '', sender: 'ai' };
      setMessages(prevMessages => [...prevMessages, tempMessage]);

      const response = await sendMessage([...messages, userMessage]);
      
      typeMessage(response, (text) => {
        setMessages(prevMessages => [
          ...prevMessages.slice(0, -1),
          { ...tempMessage, text }
        ]);
      });
    } catch (error) {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Sorry, an error occurred. Please try again later.", sender: 'ai' }
      ]);
      setIsTyping(false);
    }
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
    setTimeout(() => {
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true }) as unknown as React.FormEvent;
      handleSubmit(submitEvent);
    }, 100);
  };

  const renderTextAsHtml = (text: string) => {
    const processedText = text
      .replace(/^####\s+(.*)$/gm, '<h4>$1</h4>')
      .replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
      .replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
      .replace(/^#\s+(.*)$/gm, '<h1>$1</h1>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/^---$/gm, '<hr />')
      .replace(/^(✅)\s+(.*)$/gm, '<div style="margin-left: 20px; margin-bottom: 8px;"><span style="margin-right: 5px;">$1</span>$2</div>')
      .replace(/^-\s+(.*)$/gm, '<div style="margin-left: 20px; margin-bottom: 8px;"><span style="margin-right: 5px;">•</span>$1</div>')
      .replace(/^(\d+)\.\s+(.*)$/gm, '<div style="margin-left: 20px; margin-bottom: 8px;"><span style="margin-right: 5px;">$1.</span>$2</div>')
      .replace(/([^\\]|^)(\*|#)/g, '$1');

    const sanitizedHtml = DOMPurify.sanitize(processedText.split('\n').join('<br/>'));
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  };

  return (
    <div className="exercise-content-wrapper">
      <div className={`exercise-chat-container ${isInitialState ? 'initial-state' : ''}`}>
        <div className="exercise-chat-box">
          <div className="exercise-chat-header">
            <h3>Intelligent Exercise Consultation</h3>
            {isTyping && <div className="exercise-typing-indicator">AI is typing...</div>}
          </div>
          <div className="exercise-messages-container">
            {messages.map((message, index) => (
              <div key={index} className={`exercise-message ${message.sender}`}>
                {message.sender === 'ai' ? (
                  <div className="markdown-content">
                    {renderTextAsHtml(message.text)}
                  </div>
                ) : (
                  message.text
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="exercise-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
              className="exercise-chat-input"
            />
            {!showRecommendations && (
              <button 
                type="button" 
                className="exercise-suggestion-toggle"
                onClick={() => setShowRecommendations(true)}
                title="Show suggestions"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            <button type="submit" className="exercise-send-button">
              Send
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>

        {showRecommendations && (
          <div className="exercise-recommended-questions">
            {isInitialState ? (
              recommendedQuestions.map((category, index) => (
                <div key={index} className="exercise-question-category">
                  <h4>{category.title}</h4>
                  <div className="exercise-question-list">
                    {category.questions.map((question, qIndex) => (
                      <button
                        key={qIndex}
                        className="exercise-question-card"
                        onClick={() => handleQuestionClick(question)}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="exercise-condensed-questions">
                {recommendedQuestions.map((category, index) => (
                  category.questions.length > 0 && (
                    <button
                      key={index}
                      className="exercise-question-card"
                      onClick={() => handleQuestionClick(category.questions[0])}
                    >
                      {category.questions[0]}
                    </button>
                  )
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseAIChatBox; 