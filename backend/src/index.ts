import { now } from './util';
import { World } from './world';
import startServer from './server';

const PORT = 8090;
const HOST = '0.0.0.0';

let world: World;

function startGameLoop () {
    let lastFrame = now();
    setInterval(async () => {
        await world.update((now() - lastFrame) / 1000);
        lastFrame = now();
    }, 1000/60);
}

function main () {
    world = new World();

    startServer(PORT, HOST, world);

    world.init();
    startGameLoop();
}

main();