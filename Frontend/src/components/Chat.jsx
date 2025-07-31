import React, { useState, useEffect, useRef } from 'react';

// Main Chat component
const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatHistoryRef = useRef(null); // Ref for scrolling to the bottom

  // Scroll to the bottom of the chat history whenever it updates
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Function to simulate an AI response
  const getAIResponse = (message) => {
    if (message.includes('trends')) {
      return "The customer '2K Games' showed a significant increase in revenue from Quarter 3 to Quarter 4, with a variance of 53,540.69, which is a 231.48% increase. This indicates a strong performance and potential for further growth.";
    } else if (message.includes('patterns')) {
      return "The 'One-time_APAC' customer, on the other hand, experienced a decrease in revenue from Quarter 3 to Quarter 4, with a variance of -28,491.07, which is a 47.78% decrease. This suggests that there may be some issues.";
    } else if (message.includes('next steps')) {
      return "Based on the trends, I recommend investigating the 'One-time_APAC' customer's performance to identify the root cause of the decline and strategize on improving their engagement.";
    } else if (message.toLowerCase().includes('quarterly revenue data')) {
        return "Please specify what you'd like to know about the Quarterly Revenue data. For example, 'What trends do you see?' or 'Any concerning patterns?'";
    }
    return "I'm not sure how to respond to that. Can you please rephrase?";
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const newUserMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputText.trim(),
    };

    setChatHistory((prevHistory) => [...prevHistory, newUserMessage]);
    setInputText('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      const newAIResponse = {
        id: Date.now() + 1, // Ensure unique ID
        sender: 'ai',
        text: getAIResponse(newUserMessage.text),
      };
      setChatHistory((prevHistory) => [...prevHistory, newAIResponse]);
    }, 500);
  };

  // Handle clicking on a predefined question
  const handleQuestionClick = (question) => {
    const newUserMessage = {
      id: Date.now(),
      sender: 'user',
      text: question,
    };
    setChatHistory((prevHistory) => [...prevHistory, newUserMessage]);

    // Simulate AI response immediately
    setTimeout(() => {
      const newAIResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        text: getAIResponse(question),
      };
      setChatHistory((prevHistory) => [...prevHistory, newAIResponse]);
    }, 500);
  };

  // Predefined questions
  const predefinedQuestions = [
    "What trends do you see?",
    "Any concerning patterns?",
    "Recommend next steps",
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-inter antialiased">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 text-center text-lg font-semibold text-gray-800 rounded-b-lg">
        AI Assistant
      </header>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col p-4 overflow-hidden">
        {/* Predefined questions */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
          {predefinedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(question)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-sm sm:text-base"
            >
              {question}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto bg-white p-4 rounded-xl shadow-lg mb-4 flex flex-col space-y-4" ref={chatHistoryRef}>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Chat History</h2>
          {chatHistory.length === 0 ? (
            <p className="text-gray-500 text-center italic">Start a conversation!</p>
          ) : (
            chatHistory.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs sm:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm sm:text-base">{message.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="flex items-center bg-white p-3 rounded-xl shadow-lg">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            placeholder="Ask about your Quarterly Revenue data..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm sm:text-base"
          />
          <button
            onClick={handleSendMessage}
            className="ml-3 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Chat;