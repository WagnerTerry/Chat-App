import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import './style.scss';
import WebSocketService from '../../services/WebSocketService';

const AgentConnection: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [maxCalls, setMaxCalls] = useState('');
    const webSocketService = WebSocketService.getInstance()
    const socket = webSocketService.getSocket();

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleMaxCallsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxCalls(e.target.value);
    };

    const handleJoinRoom = () => {
        if (username.trim() !== '' && maxCalls.trim() !== '' && socket) {

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
