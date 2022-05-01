import { Brain } from './brain';
import { Entity } from './entity';
import { v2 } from './v2';
import * as tf from '@tensorflow/tfjs';

interface Phenotype {
    colour: string;
    maxMoveSpeed: number;
    maxTurnSpeed: number;
    maxWeight: number;
    maxEnergy: number;
}

export class Agent extends Entity {
    brain: Brain;
    weight = 10;
    energy = 10;

    constructor (id: number, position= new v2(0, 0), rotation=0) {
        super(id, position, rotation);

        this.brain = new Brain;
    }

    public override json () {
        return {
            ...this,
            genes: this.phenotype()
        };
    }

    public update (dT: number) {
        this.brain.update({
            raw: tf.randomNormal([10], 0.5, 1, 'float32', this.id)
        }, {

            move: (amount: number) => {
                const magnitude = Math.max(-1, Math.min(amount, 1)) * this.phenotype().maxMoveSpeed * dT;
                this.position.add(new v2(magnitude, 0).rotate(this.rotation));
            },

            turn: (amount: number) => {
                this.rotation += amount * this.phenotype().maxTurnSpeed * dT;
            }
        });
    }

    public phenotype (): Phenotype{
        return {
            colour: 'rgb(0, 0, 0)',
            maxMoveSpeed: 10,
            maxTurnSpeed: 10**-1,
            maxEnergy: 10**0,
            maxWeight: 10
        }
    }

    init () {
        this.brain.init(2, [10], 2);
    }
}