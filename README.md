# Desafio Digitro frontend

- Chat App

## Dependencias
- npm i sass
- npm i react-router-dom
- npm i axios
- npm i socket.io-client
- npm i @mui/icons-material
- npm i @mui/material
- npm i @emotion/react

## Configurando conexão
Configure connection:
- server url: https://dev.digitro.com
- json config: {"path": "/callcontrol", "forceNew": true, "reconnectionAttempts": 3, "timeout": 2000}

## Detalhes do desafio front-end

Desenvolver uma interface em React que simule uma aplicação simples de conversas de chat.

Esta interface deverá:

Permitir informar um nome de usuário e a quantidade de chats simultâneos que serão atendidos.
Exibir a lista de conversas em andamento com a identificação de cada uma delas,
Exibir os dados da conversa ao clicar sobre uma conversa em andamento.
Mais informações sobre o servidor na seção Informações técnicas

### Ações que o usuário poderá tomar:
- Poderá conectar e desconectar o usuário.
- No momento da conexão informará o nome de usuário e o número máximo de chats simultâneos que o servidor poderá enviar para o usuário.
- Quando estiver desconectado não vai receber chats;
- Poderá alternar entre os chats em andamento;
- Poderá finalizar uma chamada;
ℹ O termo chamada se refere a um chat em andamento.

### Informações técnicas
A interface se comunicará com o servidor via websocket (socket.io) que está hospedado em um domínio da Dígitro: http://dev.digitro.com/callcontrol
Documentação da API disponível no arquivo API.md em anexo (Dica: é possível se testar essa API com ferramentas como o SocketIO Client).
Uma vez o usuário conectado, o servidor começará a enviar eventos de nova chamada para ele até atingir o máximo simultâneo pré-definido na conexão do usuário.
O servidor enviará um evento USER_CONNECTED caso a conexão tenha sido feita com sucesso.
Estas chamadas serão enviadas em intervalos de tempo aleatórios entre 0 e 15 segundos. ⚠Portanto, se na conexão informar o máximo de 1 chamada, fique atento que poderá levar até 15 segundos para o evento com esta chamada ser enviado.⚠
