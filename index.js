const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: server });
const cors = require('cors');

wss.on('connection', (ws) => {
    console.log('A new client connected!');
    ws.send('welcome new client!');

    ws.on('message', (message) => {
        if (message == 'ping!') {
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send('pong!');
                }
            });
        } else {
            ws.send('wrong!');
        }
    });
});

app.get('/websocket', (req, res, next) => {
    res.json({ token: '123456' });
});

server.listen(3000, () => { console.log('Listening on port: 3000') });
