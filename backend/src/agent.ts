import * as tf from '@tensorflow/tfjs';
import Victor from 'victor';
import {NNBrain as Brain} from './brain/neuralNet';
import {Entity} from './entity';
import {v2} from './v2';
import { Pheromone } from "./pheromone";
import { IBrainIn, IBrainOut } from "./brain/brain";

interface Desires {
    hunger: number;
}

export class Agent extends Entity {
    brain: Brain;

    alive = true;

    constructor (id: number, position: Victor, rotation= 0) {
        super(id, position, rotation);

        this.brain = new Brain;
        this.mass = 10;
        this.energy = 10;
    }

    public json () {
        return {
            ...this,
            ...this.phenotype,
            desires: this.desires()
        };
    }

    public override async Update (
        dT: number,
        entities: Entity[],
        addEntity: (cb: (id: number) => Entity) => void
    ) {
        this.age += dT;

        if (!this.alive) return;

        this.energy -= this.phenotype.restingEnergyUsage * this.mass * dT;
        this.checkEnergyLevels();

        const self = this;

        const inputs: IBrainIn = {
            raw: tf.randomNormal([10], 0),
            entities,
            self,
            dT
        };

        const outputs: IBrainOut = {

            move: (amount: number) => {
                this.move(amount, dT);
            },

            turn: (amount: number) => {
                this.turn(amount, dT);
            },

            releasePheromone: () => {
                addEntity((id: number) => {
                    return new Pheromone(id, 1, self.position)
                });
            }
        };

        await this.brain.Update(inputs, outputs);

        this.checkEnergyLevels();
    }

    public get phenotype () {
        if (this.alive) {
            return {
                colour: 'rgb(255, 0, 0)',
                maxMoveSpeed: 10,
                maxTurnSpeed: 10**-1,
                maxEnergy: 10**0,
                maxMass: 10,
                restingEnergyUsage: 10**-2,
                movementEnergyCoefficient: 10**-3,
                attack: 1,
                defense: 1,
                canEat: true,
                canEatDead: false,
                edible: true
            };
        } else {
            return {
                colour: 'rgb(0, 0, 0)',
                maxMoveSpeed: 0,
                maxTurnSpeed: 0,
                maxEnergy: this.energy,
                maxMass: this.mass,
                restingEnergyUsage: 0,
                movementEnergyCoefficient: 0,
                attack: 0,
                defense: 0,
                canEat: false,
                canEatDead: false,
                edible: true
            };
        }
    }

    private desires (): Desires {
        return {
            hunger: 1 - (this.energy / this.phenotype.maxEnergy)
        };
    }

    public Init () {
        this.brain.Init(2, 10, 2);
    }

    public checkEnergyLevels () {
        if (this.energy < 0) {
            this.Die();
            return;
        }
    }

    public Die () {
        // convert all mass to energy
        this.energy = this.mass;
        this.alive = false;
    }

    public consume (e: Entity) {
        this.energy += e.energy;
        e.Die();
    }

    public move (amount: number, dT: number) {
        const magnitude = Math.max(-1, Math.min(amount, 1)) * this.phenotype.maxMoveSpeed * dT;

        this.position.add(new v2(magnitude, 0).rotate(this.rotation));
        this.energy -= magnitude * this.phenotype.movementEnergyCoefficient;
    }

    public turn (amount: number, dT: number) {
        this.rotation += amount * this.phenotype.maxTurnSpeed * dT;
    }

    public override Touching (e: Entity): boolean {
        return e.position.distance(this.position) <= this.mass + e.mass;
    }

    public override OnCollision (e: Entity) {
        if (this.desires().hunger <= 0 || !this.phenotype.canEat) {
            return;
        }
        if (e.phenotype.attack > this.phenotype.defense) {
            return;
        }
        if (e.phenotype.defense >= this.phenotype.attack) {
            return;
        }

        this.consume(e);
    }
}