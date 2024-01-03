import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"

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
    const navigate = useNavigate();
    const location = useLocation();
    const webSocketService = WebSocketService.getInstance()
    const [calls, setCalls] = useState<CallData[]>([]);
    const [selectedCall, setSelectedCall] = useState<CallData | null>(null);


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

            // Ouvir eventos de chamadas encerradas com sucesso
            socket.on('CALL_ENDED', (endedCallData: { callId: string }) => {
                console.log('Chamada encerrada com sucesso:', endedCallData);

                // Atualizar o estado local para refletir o encerramento da chamada
                setCalls((prevCalls) =>
                    prevCalls.map((call) =>
                        call.callId === endedCallData.callId ? { ...call, ended: true } : call
                    )
                );
            });

            // Ouvir eventos de falha ao encerrar chamada
            socket.on('END_CALL_ERROR', (errorData: { callId: string; error: string }) => {
                console.error('Erro ao encerrar chamada:', errorData);

                // Exibir mensagem de erro ou tratar conforme necessário
                // ...

                // Aqui você pode decidir se deseja atualizar o estado local de alguma forma
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

    const handleDisconnect = () => {
        const socket = webSocketService.getSocket();
        const username = location?.state?.username;

        if (socket && socket.connected && username) {
            // Emitir o evento USER_DISCONNECT para o servidor
            socket.emit('USER_DISCONNECT', { username });

            // Desconectar o socket localmente (opcional)
            webSocketService.disconnect();
            console.log("Usuário desconectado")
        }

        // Navegar de volta à tela de conexão ou para onde for apropriado
        navigate('/');
    };

    const handleEndCall = (callId: string) => {
        const socket = webSocketService.getSocket();
        const username = location?.state?.username;

        if (socket && socket.connected && username) {
            // Emitir o evento END_CALL para o servidor
            socket.emit('END_CALL', { callId });

            // Atualizar o estado local para refletir o encerramento da chamada
            setCalls((prevCalls) =>
                prevCalls.map((call) =>
                    call.callId === callId ? { ...call, ended: true } : call
                )
            );
        }
    };

    const handleCardClick = (call: CallData) => {
        setSelectedCall(call);
    }

    return (
        <div id="service">

            <h1>Tela de atendimento</h1>

            <header>
                <strong>{location && location.state && location.state.username}</strong>
                <button onClick={handleDisconnect}>Desconectar</button>
            </header>

            <main>
                <div className="chat-list">
                    <h2>Atendimento</h2>
                    {calls.map((call, index) => {
                        // Converte a string de data para um objeto Date
                        const startDate = new Date(call.startDate);

                        // Obtém hora e minuto formatados
                        const hours = startDate.getHours().toString().padStart(2, '0');
                        const minutes = startDate.getMinutes().toString().padStart(2, '0');

                        // // Obtém minutos e segundos formatados
                        // const minutes = startDate.getMinutes().toString().padStart(2, '0');
                        // const seconds = startDate.getSeconds().toString().padStart(2, '0');

                        return (
                            <Card
                                key={index}
                                icon={ChatIcon}
                                title={call.caller}
                                subtitle={call.service}
                                word={`${hours}:${minutes}`}
                                onClick={() => handleCardClick(call)}
                            />
                        );
                    })}
                </div>
                <div className="chat-information">
                    <h3>Chamada selecionada</h3>

                    {selectedCall && (
                        <>
                            <span>
                                CallId: {selectedCall.callId} <br />
                                Midia: {selectedCall.media} <br />
                                Data Inicial: {selectedCall.startDate} <br />
                                Serviço: {selectedCall.service} <br />
                                Origem: {selectedCall.caller} <br />
                            </span>

                            <div className="end-chat">
                                <button onClick={() => handleEndCall(selectedCall?.callId)}>
                                    Finalizar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main>

        </div>
    )
}