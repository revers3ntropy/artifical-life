import express from 'express';
import ws from 'ws';

import { now } from './util';
import { World } from './world';

const PORT = 8090;
const HOST = '0.0.0.0';

const wsConnections: ws.WebSocket[] = [];

let world: World;

function startWSTicker () {
    setInterval(() => {
        for (const con of wsConnections) {
            con.send(JSON.stringify(world.json()));
        }
    }, 1000/60);
}

function startGameLoop () {
    let lastFrame = now();
    setInterval(() => {
        world.update((now() - lastFrame) / 1000);
        lastFrame = now();
    }, 1000/60);
}

function main () {
    const app = express();

    const wsServer = new ws.Server({
        noServer: true
    });

    wsServer.on('connection', (socket) => {
        if (socket) {
            wsConnections.push(socket);
        }
    });

    const server = app.listen(PORT, HOST);
    console.log(`Running on http://${HOST}:${PORT}`);

    server.on('upgrade', (request, socket, head) => {
        wsServer.handleUpgrade(request, socket, head, (socket) => {
            wsServer.emit('connection', socket, request);
        });
    });

    world = new World();
    world.init();
    startGameLoop();

    startWSTicker();
}

main();