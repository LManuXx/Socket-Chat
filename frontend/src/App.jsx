import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('/');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: 'Yo',
    };
    setMessages([...messages, newMessage]);
    socket.emit('message', message);
    setMessage(''); // Clear the input field after sending
  };

  useEffect(() => {
    socket.on('message', receiveMessage);

    return () => {
      socket.off('message', receiveMessage);
    };
  }, []);

  const receiveMessage = (message) => setMessages((state) => [...state, message]);

  return (
    <div className="flex flex-col h-screen bg-gray-300">
      <div className="flex-1 p-4">
        <ul className="space-y-2">
          {messages.map((message, i) => (
            <li key={i} className={
              `p-2 rounded-md shadow ${message.from==='Yo' ? `bg-white`: `bg-sky-200` }`
            }>
              <span className="font-semibold block">{message.from}</span> {message.body}
            </li>
          ))}
        </ul>
      </div>
      <form className="p-4" onSubmit={handleOnSubmit}>
        <div className="flex">
          <input
            type="text"
            placeholder="Escribe para enviar un mensaje"
            className="flex-1 p-2 rounded-l-md focus:outline-none shadow-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
