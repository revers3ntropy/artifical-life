import {v2} from './v2';

export abstract class Entity {
    position: v2;

    protected constructor (position=v2.zero) {
        this.position = position;
    }

    abstract json (): string;
    abstract update (dT: number): void;
    abstract init (): void;
}