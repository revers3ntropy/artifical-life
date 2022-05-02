import { Agent } from './agent';
import { Entity } from './entity';
import { v2 } from "./v2";

export class World {
    entities: Entity[] = [];

    json () {
        return {
            entities: this.entities.map(e => e.json())
        };
    }

    init () {
        for (let i = 0; i < 1; i++) {
            const a = new Agent(
                i,
                new v2(0, 0).randomize(new v2(-50, 50), new v2(50, -50)),
                Math.random() * Math.PI*2
            );
            a.init();
            this.entities.push(a);
        }
    }

    async update (dT: number) {
        for (const entity of this.entities) {
            await entity.update(dT, this.entities);
        }
    }
}