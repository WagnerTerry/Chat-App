import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import WebSocketService from "../../services/WebSocketService";

import Card from "../../Components/Card";
import ChatIcon from '@mui/icons-material/Chat';

import './style.scss'

interface CallData {
    callId: string;
    caller: string;
    media: string;
    service: string;
    startDate: string
}

export const ServiceScreen = () => {
    const location = useLocation();
    const webSocketService = WebSocketService.getInstance()
    const [calls, setCalls] = useState<CallData[]>([]);

    useEffect(() => {
        const socket = webSocketService.getSocket();

        // Verificar se a conexão WebSocket está pronta
        if (socket && socket.connected) {
            // Enviar o evento USER_CONNECT para o servidor
            const userData = {
                username: location?.state?.username || '',
                maxCalls: location?.state?.maxCalls || 0,
            };

            socket.emit('USER_CONNECT', userData);


            // Ouvir eventos de chamadas do servidor
            socket.on('NEW_CALL', (callData: CallData) => {
                // Exibir informações da chamada no console
                console.log('Nova chamada recebida:', callData);

                // Atualizar o estado com as chamadas recebidas
                setCalls((prevCalls) => [...prevCalls, callData]);
            });

            // // Ouvir eventos de chamadas do servidor
            // socket.on('CALL_RECEIVED', (callData) => {
            //     // Exibir informações da chamada no console (substitua pelo seu código real)
            //     console.log('Chamada recebida:', callData);

            //     // Atualizar o estado com as chamadas recebidas
            //     setCalls((prevCalls) => [...prevCalls, callData]);
            // });
        } else {
            console.warn('Conexão WebSocket não está pronta. Não foi possível enviar USER_CONNECT.');
        }

        // Cleanup: Desconectar os event listeners quando o componente for desmontado
        return () => {
            if (socket) {
                socket.off('CALL_RECEIVED');
            }
        };
    }, [location?.state?.username, location?.state?.maxCalls, webSocketService]);

    return (
        <div id="service">

            <h1>Tela de atendimento</h1>

            <header>
                <strong>{location && location.state && location.state.username}</strong>
                <button>Desconectar</button>
            </header>

            <main>
                <div className="chat-list">
                    <h2>Atendimento</h2>
                    {calls.map((call, index) => (
                        <Card
                            key={index}
                            icon={ChatIcon}
                            title={call.caller}
                            subtitle={call.service}
                            word={call.startDate}
                        />
                    ))}
                </div>
                <div className="chat-information">
                    <h3>Chamada selecionada</h3>

                    <span>
                        CallId: 123121 <br />
                        Midia: CHAT <br />
                        Data Inicial: 20/12/2023 13:30:10 <br />
                        Serviço: Nova matrícula <br />
                        Origem: Lucas <br />
                    </span>

                    <div className="end-chat">
                        <button>Finalizar</button>
                    </div>

                </div>
            </main>


        </div>
    )
}