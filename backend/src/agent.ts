import { Brain } from './brain';
import { v2 } from './v2';
import * as tf from '@tensorflow/tfjs';
import { Entity } from "./entity";

interface Desires {
    hunger: number;
}

export class Agent extends Entity {
    brain: Brain;

    alive = true;

    constructor (id: number, position= new v2(0, 0), rotation= 0) {
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

    public override async Update (dT: number, entities: Entity[]) {
        this.age += dT;

        if (!this.alive) return;

        this.energy -= this.phenotype.restingEnergyUsage * this.mass * dT;
        this.checkEnergyLevels();

        await this.brain.update({
            raw: tf.randomNormal([10], 0)
        }, {
            move: (amount: number) => {
                this.move(amount, dT);
            },

            turn: (amount: number) => {
                this.turn(amount, dT);
            }
        });

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
                canEatDead: false
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
                canEatDead: false
            };
        }
    }

    private desires (): Desires {
        return {
            hunger: 1 - (this.energy / this.phenotype.maxEnergy)
        };
    }

    public Init () {
        this.brain.init(2, [10], 2);
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
        return false;
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