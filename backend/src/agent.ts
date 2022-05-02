import { Brain } from './brain';
import { Entity } from './entity';
import { v2 } from './v2';
import * as tf from '@tensorflow/tfjs';

interface Phenotype {
    colour: string;
    maxMoveSpeed: number;
    maxTurnSpeed: number;
    maxMass: number;
    maxEnergy: number;
    restingEnergyUsage: number;
    movementEnergyCoefficient: number;
    attack: number;
    defense: number;
}

export class Agent extends Entity {
    brain: Brain;
    mass = 10;
    energy = 10;
    age = 0;
    alive = true;

    constructor (id: number, position= new v2(0, 0), rotation= 0) {
        super(id, position, rotation);

        this.brain = new Brain;
    }

    public override json () {
        return {
            ...this,
            ...this.phenotype()
        };
    }

    public async update (dT: number, entities: Entity[]) {

        this.age += dT;

        if (!this.alive) return;

        this.energy -= this.phenotype().restingEnergyUsage * this.mass * dT;
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

    public phenotype (): Phenotype {
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
                defense: 1
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
                defense: 0
            };
        }
    }

    public init () {
        this.brain.init(2, [10], 2);
    }

    public checkEnergyLevels () {
        if (this.energy < 0) {
            this.kill();
            return;
        }
    }

    public kill () {
        // convert all mass to energy
        this.energy = this.mass;
        this.alive = false;
    }

    public move (amount: number, dT: number) {
        const magnitude = Math.max(-1, Math.min(amount, 1)) * this.phenotype().maxMoveSpeed * dT;

        this.position.add(new v2(magnitude, 0).rotate(this.rotation));
        this.energy -= magnitude * this.phenotype().movementEnergyCoefficient;
    }

    public turn (amount: number, dT: number) {
        this.rotation += amount * this.phenotype().maxTurnSpeed * dT;
    }
}