import {Brain} from './brain';
import {Entity} from './entity';
import {v2} from './v2';

export class Agent extends Entity {
    brain: Brain;

    constructor (position=v2.zero) {
        super(position);

        this.brain = new Brain;
    }

    public json () {
        return JSON.stringify(this);
    }

    public update (dT: number) {
        this.brain.update();
    }

    init () {
        this.brain.init();
    }
}