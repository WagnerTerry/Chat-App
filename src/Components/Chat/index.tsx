// src/Chat.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import io from 'socket.io-client';



const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string }[]>([]);
  const [message, setMessage] = useState('');

  const socket = io('https://dev.digitro.com', {
    path: '/callcontrol',
    forceNew: true,
    reconnectionAttempts: 3,
    timeout: 2000,
  });

  useEffect(() => {
    // Conectar-se ao servidor Socket.io
    socket.connect();

    // Lidar com mensagens recebidas
    socket.on('message', (data: { text: string }) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Limpar a conexão ao desmontar o componente
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      // Enviar mensagem para o servidor
      socket.emit('message', { text: message });
      console.log("socker", message)

      // Limpar a caixa de entrada de mensagens
      setMessage('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
