import Entity from './entity';
import Species from './entity/species';
import { sim } from "./sim";
import { startServer } from "./server";

export {
    Entity,
    Species
};


export * from './units';

export function start ({
    tps=30,
    serverPort=5000,
    serverHost='localhost',
}) {
    sim.world.init();

    startServer(serverPort, serverHost);

    setInterval(() => {
        // event loop


        sim.world.update();

    }, 1000/tps);
}