import mass from "../units/kg";
import rgb from "../units/rgb";
import shapes from "../units/shape";

export interface Phenotype {
    maxSize: mass;
    colour: rgb;
    speed: number;
    shape: shapes;
}

export default abstract class Entity implements Phenotype {
    abstract init (): void;
    abstract tick (dT: number): void;

    get hunger (): number {
        return 1;
    }

    colour = new rgb;
    maxSize = new mass;
    shape = shapes.circle;
    speed = 1;
}
