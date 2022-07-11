import * as http from 'http';
import ws from 'ws';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function requestListener (req, res) {

}

export function startServer (port: number, host: string) {

    const server = http.createServer(requestListener);

    const connections = new Map();

    const wss = new ws.Server({ port });

    wss.on('connection', (ws) => {
        const id = uuidv4();
        const color = Math.floor(Math.random() * 360);
        const metadata = { id, color };

        connections.set(ws, metadata);

        ws.on('message', (messageAsString) => {
            const message = JSON.parse(String(messageAsString));
            const metadata = connections.get(ws);

            message.sender = metadata.id;
            message.color = metadata.color;
            const outbound = JSON.stringify(message);

            // @ts-ignore
            [...connections.keys()].forEach((client) => {
                client.send(outbound);
            });
        });

        ws.on("close", () => {
            connections.delete(ws);
        });
    });

    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
}