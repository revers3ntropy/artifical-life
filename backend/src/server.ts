import express from "express";
import ws from "ws";
import type { World } from "./world";

const wsConnections: ws.WebSocket[] = [];

function startWSTicker (world: World) {
    setInterval(() => {
        for (const con of wsConnections) {
            con.send(JSON.stringify(world.json()));
        }
    }, 1000/60);
}

export default function (PORT: number, HOST: string, world: World) {
    const app = express();

    app.get('/', (req, res) => {
        res.send('1');
    })

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

    startWSTicker(world);
}