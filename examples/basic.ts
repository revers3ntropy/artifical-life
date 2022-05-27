import { Species, rgb, mass, v2, shapes, Entity } from '../framework';

class MySpecies extends Species {
	name = 'My Species';
	maxSize = new mass(10);
	colour = new rgb(0, 0, 0);
	speed = 1;
	shape = shapes.circle;
	canReproduce = true;
	geneticVariation = 0.0;

	onEat (self: Entity) {
		self.colour = new rgb(0, self.hunger * 255, 0);
	}
}
MySpecies.populate(10, {
	boundaries: [new v2(0, 0), new v2(100, 100)],
	geneticVariation: 0.03,
});

start({
	tps: 60
});
