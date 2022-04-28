import {Agent} from './agent';
import {Entity} from './entity';

export class World {
    entities: Entity[] = [];

    json () {
        return JSON.stringify(this);
    }

    init () {
        for (let i = 0; i < 10; i++) {
            const a = new Agent();
            a.init();
            this.entities.push(a);
        }
    }

    update (dT: number) {
        for (const e of this.entities) {
            e.update(dT);
        }
    }
}