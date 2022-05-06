import { Entity } from "./entity";
import { v2 } from "./v2";

export class Pheromone extends Entity {
    strength: number;

    constructor (id: number, strength: number, position= new v2(0, 0)) {
        super(id, position, 0);
        this.strength = strength;
    }

    Die () {
        this.strength = 0;
    }

    Init () {}

    OnCollision (e: Entity): void {}

    Touching (e: Entity): boolean {
        return false;
    }

    Update (dT: number, entities: Entity[]): Promise<void> {
        return Promise.resolve(undefined);
    }

    get phenotype () {
        return {
            colour: 'rgb(161,161,161)',
            maxMoveSpeed: 0,
            maxTurnSpeed: 0,
            maxEnergy: 0,
            maxMass: 0,
            restingEnergyUsage: 0,
            movementEnergyCoefficient: 0,
            attack: 0,
            defense: Infinity,
            canEat: false,
            canEatDead: false,
            edible: false,
        };
    }

}