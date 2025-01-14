//const crypto = require('crypto');
//const express = require('express');
//const { createServer } = require('http');
//const WebSocket = require('ws');

//const app = express();
//const port = 3000;

//const server = createServer(app);
//const wss = new WebSocket.Server({ server });

//wss.on('connection', function(ws) {
//  console.log("client joined.");

//  // send "hello world" interval
//  const textInterval = setInterval(() => ws.send("hello world!"), 100);

//  // send random bytes interval
//  const binaryInterval = setInterval(() => ws.send(crypto.randomBytes(8).buffer), 110);

//  ws.on('message', function(data) {
//    if (typeof(data) === "string") {
//      // client sent a string
//      console.log(data);

//    } else {
//      console.log("binary received from client -> " + Array.from(data).join(", ") + "");
//    }
//  });

//  ws.on('close', function() {
//    console.log("client left.");
//    clearInterval(textInterval);
//    clearInterval(binaryInterval);
//  });
//});

//server.listen(port, function() {
//  console.log(`Listening on http://localhost:${port}`);
//});

const crypto = require('crypto');
const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 8080; // Porta local onde o servidor estará escutando

// Cria o servidor HTTP e WebSocket
const server = createServer(app);
const wss = new WebSocket.Server({ server });

// Configura o WebSocket
wss.on('connection', function (ws) {
  console.log("Cliente conectado.");

  // Envia "hello world" a cada 100ms
  const textInterval = setInterval(() => ws.send("hello world!"), 100);

  // Envia bytes aleatórios a cada 110ms
  const binaryInterval = setInterval(() => ws.send(crypto.randomBytes(8).buffer), 110);

  // Manipula mensagens recebidas do cliente
  ws.on('message', function (data) {
    if (typeof data === "string") {
      // Cliente enviou uma string
      console.log(`Mensagem recebida: ${data}`);
    } else {
      // Cliente enviou dados binários
      console.log(`Binário recebido do cliente -> ${Array.from(data).join(", ")}`);
    }
  });

  // Limpa os intervalos ao desconectar
  ws.on('close', function () {
    console.log("Cliente desconectado.");
    clearInterval(textInterval);
    clearInterval(binaryInterval);
  });
});

// Inicia o servidor na porta local
server.listen(port, function () {
  console.log(`Servidor rodando localmente em http://localhost:${port}`);
  console.log(`Use o endereço do ngrok para acessar publicamente: ws://0.tcp.sa.ngrok.io:14828`);
});
