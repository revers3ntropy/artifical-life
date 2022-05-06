import { Entity } from './entity';
import { v2 } from "./v2";

export class Food extends Entity {

    defense = 0.5;

    constructor (id: number, position= new v2(0, 0), rotation= 0) {
        super(id, position, rotation);

        this.mass = 10;
        this.energy = 10;
    }

    Init () {}

    OnCollision (e: Entity) {};

    Touching (e: Entity) {
        return false;
    }

    async Update (dT: number, entities: Entity[]) {}

    Die () {
        this.energy = 0;
        this.mass = 0;
        this.defense = 0;
    }

    get phenotype () {
        return {
            colour: 'rgb(0, 255, 100)',
            maxMoveSpeed: 0,
            maxTurnSpeed: 0,
            maxEnergy: this.energy,
            maxMass: this.mass,
            restingEnergyUsage: -(10**-3),
            movementEnergyCoefficient: 0,
            attack: 0,
            defense: this.defense,
            canEat: false,
            canEatDead: false,
            edible: true,
        };
    }
}