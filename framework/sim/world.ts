import { ISpecies } from "../entity/species";
import Entity from "../entity";

export class World {

    private species: ISpecies[] = [];
    private entities: Entity[] = [];

    startedSim = false;

    addSpecies (species: ISpecies) {
        this.species.push(species);

        if (this.startedSim) {
            this.populateSpecies(species);
        }
    }

    populateSpecies (species: ISpecies) {

    }

    init () {
        for (let s of this.species) {
            this.populateSpecies(s);
        }
    }

    update () {

    }
}