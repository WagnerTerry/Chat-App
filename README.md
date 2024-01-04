# Desafio Digitro frontend

- Chat App

## Dependencias
- npm i sass
- npm i react-router-dom
- npm i socket.io-client
- npm i @mui/icons-material
- npm i @mui/material
- npm i @emotion/react

## Configurando conexão
Configure connection:
- server url: https://dev.digitro.com
- json config: {"path": "/callcontrol", "forceNew": true, "reconnectionAttempts": 3, "timeout": 2000}

## Rodando o projeto
- no terminal instale as dependencias rodando
- npm i
- logo após execute o npm run dev

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

## Comunicação com o servidor

A interface vai se comunicar com o servidor via websocket (socket.io) e enviará e receberá eventos.

Lista dos eventos enviados/recebidos pelo servidor (em formarto JSON):

## API
* ```USER_CONNECT```: informa ao servidor que o usuário se conectou e está disponível para receber as chamadas.
  * Dados:

      ```javascript
      {
        "username": "nome do usuário",
        "maxCalls": 8 
      }
      ```
      "maxCalls" = Número máximo de chamadas que o servidor enviará para o usuário

  * ```USER_CONNECTED```: evento enviado pelo servidor caso a conexão do usuário ocorra com sucesso:

    ```javascript
    {
      "username": "nome do usuário",
      "maxCalls": 8
    }
    ```

  * ```USER_CONNECTION_ERROR```: evento enviado pelo servidor caso ocorrer falha na conexão do usuário:

    ```javascript
    {
      "username": "nome do usuário",
      "maxCalls": 8,
      "error": "Mensagem de erro"
    }
    ```

* ```USER_DISCONNECT```: informa o servidor que o usuário se desconectou e, portanto não está mais disponível para receber chamadas.
  * Dados:

      ```javascript
      {
        "username": "nome do usuário"
      }
      ```

  * ```USER_DISCONNECTED```: evento enviado pelo servidor caso a desconexão do usuário ocorra com sucesso:

    ```javascript
    {
      "username": "nome do usuário"
    }
    ```

  * ```USER_DISCONNECTION_ERROR```: evento enviado pelo servidor caso ocorrer falha na desconexão do usuário:

    ```javascript
    {
      "username": "nome do usuário"
      "error": "Mensagem de erro"
    }
    ```

* ```NEW_CALL```: servidor informa o usuário que tem uma nova chamada para ele;
  * Dados:

      ```javascript
      {
        "callId": "identificador da chamada"
        "media": "CHAT",
        "startDate": Date,
        "service": "Nome do serviço vinculado à chamada",
        "caller": "Nome da pessoa que originou a chamada" 
      }
      ```

  * ```NEW_CALL_ANSWERED```: evento que deve ser enviado para o servidor caso a chamada seja recebida com sucesso pelo usuário:

    ```javascript
    {
      "callId": "identificador da chamada"
    }
    ```

  * ```NEW_CALL_ERROR```: evento que deve ser enviado para o servidor em caso de falha no recebimento da nova chamada pelo usuário:

    ```javascript
    {
      "callId": "identificador da chamada",
      "error": "Mensagem de erro"
    }
    ```

* ```END_CALL```: evento que deve ser enviado para o servidor para encerrar a chamada em andamento;
  * Dados:

      ```javascript
      {
        "callId": "identificador da chamada"
      }
      ```

  * ```CALL_ENDED```: evento que o servidor vai enviar caso a chamada seja encerrada com sucesso:

    ```javascript
    {
      "callId": "identificador da chamada"
    }
    ```

  * ```END_CALL_ERROR```: evento que o servidor vai enviar caso aconteça alguma falha ao encerrar a chamada:

    ```javascript
    {
      callId: "identificador da chamada"
      error: "Mensagem de erro"
    }
    ```
