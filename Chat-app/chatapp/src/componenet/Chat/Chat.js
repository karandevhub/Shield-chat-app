import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

const Chat = () => {
  const socket = io(ENDPOINT, { transports: ["websocket"] });
  useEffect(() => {
    socket.on("connect", () => {
    });
    return () => {};
  }, []);



  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
      if (newMessage.trim() !== '') {
          setMessages([...messages, { text: newMessage, sender: 'user' }]);
          setNewMessage('');
      }
  };

  return (
    <div className="chat-container">
            <div className="chat-header">
                <h1>Chat Box</h1>
                <p>User: {user}</p>
            </div>
            <div className="chat-body">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
  );
};

export default Chat;
