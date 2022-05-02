import { v2 } from './v2';

import Dict = NodeJS.Dict;
type radian = number;

export abstract class Entity {
    position: typeof v2.prototype;
    rotation: radian;
    id: number;

    protected constructor (id: number, position = new v2(0, 0), rotation=0) {
        this.position = position;
        this.id = id;
        this.rotation = rotation;
    }

    json (): Dict<any>  {
        return this;
    }

    abstract update (dT: number, entities: Entity[]): Promise<void>;
    abstract init (): void;
}