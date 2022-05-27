import kg from "../units/kg";
import rgb from "../units/rgb";
import shapes from "../units/shape";
import { v2 } from '../units'
import Entity, { Phenotype } from "./index";

export default abstract class Species <E=Entity> implements Phenotype {
    name = 'MySpecies';
    maxSize = new kg(1);
    colour = new rgb(0, 0, 0);

    abstract onEat (self: E): void;

    speed = 1;
    shape = shapes.circle;

    static populate (n: number, {
        boundaries = [new v2(), new v2()],
        geneticVariation = 0.01
    }) {

    }
}