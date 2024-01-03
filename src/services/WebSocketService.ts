import { io, Socket } from 'socket.io-client';

class WebSocketService {
    private static instance: WebSocketService;
    private socket: Socket | null = null;
    private socketOptions = {
        path: '/callcontrol',
        forceNew: true,
        reconnectionAttempts: 3,
        timeout: 2000,
    };

    private constructor() {
        // Conectar ao servidor via WebSocket com as opções especificadas
        this.socket = io('https://dev.digitro.com/', this.socketOptions);

        // Verificar se a conexão foi bem-sucedida
        this.socket.on('connect', () => {
            console.log('Conectado ao servidor');
        });

        // Verificar se ocorreu algum erro durante a conexão
        this.socket.on('connect_error', (error) => {
            console.error('Erro de conexão:', error);
        });
    }

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }

        return WebSocketService.instance;
    }

    public getSocket(): Socket | null {
        return this.socket;
    }

    public disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            console.log('Desconectado do servidor');
        }
    }

    public reconnect() {
        // Recriar a instância do socket
        this.socket = io('https://dev.digitro.com/', this.socketOptions);

        // Verificar se a conexão foi bem-sucedida
        this.socket.on('connect', () => {
            console.log('Reconectado ao servidor');
        });

        // Verificar se ocorreu algum erro durante a conexão
        this.socket.on('connect_error', (error) => {
            console.error('Erro de reconexão:', error);
        });
    }
}

export default WebSocketService;
