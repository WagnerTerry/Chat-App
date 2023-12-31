import React, { useState, ChangeEvent } from 'react'
import { useNavigate, Link, } from 'react-router-dom';

import "./style.scss"

const AgentConnection: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [maxCalls, setMaxCalls] = useState('')

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleMaxCallsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxCalls(e.target.value)
    }

    const handleJoinRoom = () => {
        if (name.trim() !== '' && maxCalls.trim() !== '') {
            console.log("entrar")
            navigate('/ServiceScreen', { state: { name, maxCalls } });            // navigate(`/chat?name=${encodeURIComponent(name)}&maxCalls=${encodeURIComponent(maxCalls)}`);
        }
    }

    return (
        <div id="agent-connection">
            <h1>Tela de conexão do agente</h1>

            <div className='connection-data'>
                <div>
                    <label htmlFor="name" className="input-label">Usuário</label>
                    <input type="text" value={name} className="styled-input" placeholder='Usuário' onChange={handleNameChange} />
                </div>
                <div>
                    <label htmlFor="maxCalls" className="input-label">Máximo de chamadas</label>
                    <input type="text" value={maxCalls} className="styled-input" placeholder='Máximo de chamadas' onChange={handleMaxCallsChange} />
                </div>
                <Link to="/ServiceScreen">
                    <button className="styled-button" onClick={handleJoinRoom}>Conectar</button>
                </Link>
            </div>

        </div>
    );
};

export default AgentConnection
