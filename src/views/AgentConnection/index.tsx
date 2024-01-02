import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './style.scss';
import WebSocketService from '../../services/WebSocketService';

const AgentConnection: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [maxCalls, setMaxCalls] = useState('');
    const webSocketService = WebSocketService.getInstance()
    const socket = webSocketService.getSocket();


    useEffect(() => {
        // Se o serviço WebSocket não estiver inicializado, inicialize-o
        if (!socket) {
            console.log('Inicializando conexão WebSocket...');
            const newSocket = webSocketService.getSocket();

            if (newSocket) {
                // Adicione event listeners ou lógica específica aqui, se necessário
            }
        }

        // Cleanup: Certifique-se de desconectar quando o componente for desmontado
        // return () => {
        //     console.log('Desmontando componente. Desconectando WebSocket...');
        //     webSocketService.disconnect();
        // };
    }, [socket, webSocketService]); // Depen

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleMaxCallsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxCalls(e.target.value);
    };

    const handleJoinRoom = () => {
        if (username.trim() !== '' && maxCalls.trim() !== '' && socket) {
            // Enviar o evento USER_CONNECT para o servidor
            socket.emit('USER_CONNECT', {
                username,
                maxCalls: parseInt(maxCalls, 10), // Converter para número
            });

            navigate('/ServiceScreen', { state: { username, maxCalls } });
        }
    };

    return (
        <div id="agent-connection">
            <h1>Tela de conexão do agente</h1>

            <div className="connection-data">
                <div>
                    <label htmlFor="name" className="input-label">
                        Usuário
                    </label>
                    <input
                        type="text"
                        value={username}
                        className="styled-input"
                        placeholder="Usuário"
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <label htmlFor="maxCalls" className="input-label">
                        Máximo de chamadas
                    </label>
                    <input
                        type="text"
                        value={maxCalls}
                        className="styled-input"
                        placeholder="Máximo de chamadas"
                        onChange={handleMaxCallsChange}
                    />
                </div>
                <button
                    className={`styled-button ${username.trim() === '' || maxCalls.trim() === '' ? 'disabled' : ''}`}
                    onClick={handleJoinRoom}
                    disabled={username.trim() === '' || maxCalls.trim() === ''}
                >
                    Conectar
                </button>
            </div>
        </div>
    );
};

export default AgentConnection;
