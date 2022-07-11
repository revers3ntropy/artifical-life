import { Species, start } from './framework';

Species({
    name: 'Blobs',
    startingPopulation: 10,
    spawnBoundaries: [-100, -100, 100, 100]
});

start({
    tps: 60
});
