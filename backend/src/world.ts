import { Agent } from './agent';
import { v2 } from "./v2";
import { Food } from "./food";
import { Entity } from "./entity";
import * as config from './config';

export class World {
    entities: Entity[] = [];
    lastId = 0;

    json () {
        return {
            entities: this.entities.map(e => e.json())
        };
    }

    init () {
        for (let i = 0; i < 10; i++) {
            const agent = new Agent(
                i,
                new v2(0, 0).randomize(
                    new v2(-config.worldSize, config.worldSize),
                    new v2(config.worldSize, -config.worldSize)
                ),
                Math.random() * Math.PI*2
            );
            agent.Init();
            this.entities.push(agent);
            this.lastId++;
        }
    }

    async update (dT: number) {
        for (const entity of this.entities) {
            await entity.Update(dT, this.entities, (cb) => {
                this.entities.push(cb(this.lastId));
            });
        }

        for (let i = 0; i < this.entities.length-1; i++) {
            for (let j = i; j < this.entities.length-1; j++) {
                const e1 = this.entities[i];
                const e2 = this.entities[j];

                if (e1 === e2) continue;
                if (!e1.Touching(e2)) continue;

                e1.OnCollision(e2);
                e2.OnCollision(e1);
            }
        }

        if (Math.random() < config.foodSpawnRate) {
            const food = new Food(
                this.lastId,
                new v2(0, 0).randomize(
                    new v2(-config.worldSize, config.worldSize),
                    new v2(config.worldSize, -config.worldSize)
                ),
                0
            );
            food.Init();
            this.entities.push(food);
            this.lastId++;
        }
    }
}