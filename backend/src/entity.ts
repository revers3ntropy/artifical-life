import { v2 } from './v2';
import type { JSON } from "./util";

type radian = number;

export interface Phenotype {
    colour: string;
    maxMoveSpeed: number;
    maxTurnSpeed: number;
    maxMass: number;
    maxEnergy: number;
    restingEnergyUsage: number;
    movementEnergyCoefficient: number;
    attack: number;
    defense: number;
    canEat: boolean;
    canEatDead: boolean;
    edible: boolean;
}

export abstract class Entity {
    id: number;
    age = 0;
    position: typeof v2.prototype;
    rotation: radian;
    energy = 0;
    mass = 0;

    protected constructor (id: number, position = new v2(0, 0), rotation=0) {
        this.position = position;
        this.id = id;
        this.rotation = rotation;
    }

    json (): JSON {
        return {
            ...this,
            ...this.phenotype,
        };
    }

    // shared behaviours
    abstract Update (dT: number, entities: Entity[]): Promise<void>;
    abstract Init (): void;
    abstract OnCollision (e: Entity): void;
    abstract Touching (e: Entity): boolean;
    abstract Die (): void;

    abstract get phenotype (): Phenotype;
}