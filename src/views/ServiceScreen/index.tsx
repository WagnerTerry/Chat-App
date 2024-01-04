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
    startDate: string;
    isSelected: boolean;
}

export const ServiceScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const webSocketService = WebSocketService.getInstance()
    const [calls, setCalls] = useState<CallData[]>([]);
    const [selectedCall, setSelectedCall] = useState<CallData | null>(null);
    const [isWebSocketReady, setIsWebSocketReady] = useState(false);

    useEffect(() => {
        const socket = webSocketService.getSocket();

        // Verificar se a conexão WebSocket está pronta
        if (socket) {
            // Ouvir eventos de conexão e desconexão
            socket.on('connect', () => {
                // Enviar o evento USER_CONNECT para o servidor apenas quando a conexão estiver estabelecida
                const userData = {
                    username: location?.state?.username || '',
                    maxCalls: location?.state?.maxCalls || 0,
                };

                socket.emit('USER_CONNECT', userData);
                setIsWebSocketReady(true);
            });

            //Ouvir evento de conexão do usuário
            socket.on('USER_CONNECTED', (userData: { username: string, maxCalls: number }) => {
                console.log('Usuário conectado com sucesso:', userData);
                // Você pode tratar as informações do usuário conectado aqui
            });

            // // Ouvir evento de erro na conexão do usuário
            // socket.on('USER_CONNECTION_ERROR', (errorData: { username: string, maxCalls: number, error: string }) => {
            //     console.error('Erro na conexão do usuário:', errorData);
            //     // Trate o erro conforme necessário
            // });

            // Ouvir eventos de desconexão do usuário
            socket.on('USER_DISCONNECTED', (disconnectedUser: { username: string }) => {
                console.log('Usuário desconectado com sucesso:', disconnectedUser);
                // Trate a desconexão conforme necessário
            });

            // Ouvir eventos de erro na desconexão do usuário
            socket.on('USER_DISCONNECTION_ERROR', (disconnectionError: { username: string, error: string }) => {
                console.error('Erro na desconexão do usuário:', disconnectionError);
                // Trate o erro na desconexão conforme necessário
            });

            // Atualiza o estado quando a conexão for fechada ou ocorrer um erro
            socket.on('disconnect', () => {
                setIsWebSocketReady(false);
            });
            socket.on('connect_error', () => {
                setIsWebSocketReady(false);
            });

            // Ouvir eventos de chamadas do servidor
            socket.on('NEW_CALL', (callData: CallData) => {
                // Exibir informações da chamada no console
                console.log('Nova chamada recebida:', callData);

                // Atualizar o estado com as chamadas recebidas
                setCalls((prevCalls) => [...prevCalls, callData]);
            });

            // Ouvir evento de chamada atendida com sucesso
            socket.on('NEW_CALL_ANSWERED', (answeredCallData: { callId: string }) => {
                console.log('Chamada atendida com sucesso:', answeredCallData);
                // Você pode tratar a chamada atendida conforme necessário
            });

            // Ouvir evento de falha ao receber a chamada
            socket.on('NEW_CALL_ERROR', (newCallErrorData: { callId: string, error: string }) => {
                console.error('Erro ao receber nova chamada:', newCallErrorData);
                // Trate o erro ao receber a chamada conforme necessário
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
        } else {
            console.warn('Conexão WebSocket não está pronta. Não foi possível enviar USER_CONNECT.');
        }

        // Cleanup: Desconectar os event listeners quando o componente for desmontado
        return () => {
            if (socket) {
                socket.off('NEW_CALL');
                socket.off('CALL_ENDED');
                socket.off('END_CALL_ERROR');
                socket.off('USER_CONNECTED');
                socket.off('USER_CONNECTION_ERROR');
                socket.off('USER_DISCONNECTED');
                socket.off('USER_DISCONNECTION_ERROR');
                socket.off('NEW_CALL_ANSWERED');
                socket.off('NEW_CALL_ERROR');
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
                <strong>
                    {location && location.state && location.state.username &&
                        location.state.username.charAt(0).toUpperCase() + location.state.username.slice(1)
                    }
                </strong>
                <button onClick={handleDisconnect}>Desconectar</button>
            </header>

            <main>
                {isWebSocketReady ?
                    <>
                        <div className="chat-list">

                            <h2>Atendimentos</h2>
                            {calls.map((call, index) => {
                                // Converte a string de data para um objeto Date
                                const startDate = new Date(call.startDate);


                                // Obtém minutos e segundos formatados
                                const minutes = startDate.getMinutes().toString().padStart(2, '0');
                                const seconds = startDate.getSeconds().toString().padStart(2, '0');

                                const isSelected = selectedCall && call.callId === selectedCall.callId;

                                return (
                                    <Card
                                        key={index}
                                        icon={ChatIcon}
                                        title={call.caller}
                                        subtitle={call.service}
                                        word={`${minutes}:${seconds}`}
                                        onClick={() => handleCardClick(call)}
                                        isSelected={isSelected}
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
                    </>
                    :
                    <p>Conexão WebSocket não está pronta. Aguarde...</p>
                }

            </main>

        </div>
    )
}