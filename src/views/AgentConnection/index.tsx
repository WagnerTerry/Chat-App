import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

import './style.scss';

const AgentConnection: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [maxCalls, setMaxCalls] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Configuração das opções de conexão
        const socketOptions = {
            path: '/callcontrol',
            forceNew: true,
            reconnectionAttempts: 3,
            timeout: 2000,
        };

        // Conectar ao servidor via WebSocket com as opções especificadas
        const socket = io('https://dev.digitro.com/', socketOptions);
        setSocket(socket);

        // Verificar se a conexão foi bem-sucedida
        socket.on('connect', () => {
            console.log('Conectado ao servidor');
        });

        // Verificar se ocorreu algum erro durante a conexão
        socket.on('connect_error', (error) => {
            console.error('Erro de conexão:', error);
        });

    }, []);

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
