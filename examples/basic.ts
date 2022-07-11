import { Species, rgb, mass, shapes, Entity, start } from '../framework';

Species({
	name: 'My Species',
	maxSize: new mass(10),
	colour: new rgb(0, 0, 0),
	speed: 1,
	shape: shapes.circle,
	canReproduce: true,

	onEat: (self: Entity) => {
		self.colour = new rgb(0, self.hunger * 255, 0);
	},

	startingPopulation: 10,
	spawnBoundaries: [-100, -100, 100, 100],
});

start({
	tps: 60
});
