import kg from "../units/kg";
import rgb from "../units/rgb";
import shapes from "../units/shape";
import Entity from "./index";
import { sim } from "../sim";

export interface ISpeciesConfig<T> {
    name?: string;
    maxSize?: kg
    colour?: rgb

    onEat?: ((self: T) => void);

    speed?: number;
    shape?: shapes;
    canReproduce?: boolean;

    startingPopulation?: number;
    spawnBoundaries?: [number, number, number, number];
    spawnGeneticVariation?: number
}

export interface ISpecies<T> extends ISpeciesConfig<T>{
    name: string;
    maxSize: kg
    colour: rgb

    onEat: ((self: T) => void);

    speed: number;
    shape: shapes;
    canReproduce: boolean;

    startingPopulation: number;
    spawnBoundaries: [number, number, number, number];
    spawnGeneticVariation: number
}

const defaultSpeciesConfigValues: ISpecies<unknown> = {
    name: 'Unnamed Species',
    maxSize: new kg,
    colour: new rgb,

    onEat: () => void 0,

    speed: 1,
    shape: shapes.circle,
    canReproduce: true,

    startingPopulation: 1,
    spawnBoundaries: [-100, -100, 100, 100],
    spawnGeneticVariation: 0.01,
};

export default function Species <constructs extends Entity = Entity> (config: ISpeciesConfig<constructs>) {
    sim.world.addSpecies({
        ...defaultSpeciesConfigValues,
        ...config,
    });
}