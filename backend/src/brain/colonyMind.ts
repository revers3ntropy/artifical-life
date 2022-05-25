import {Brain, IBrainIn, IBrainOut} from './brain';

export class ColonyMind implements Brain {
    dT = 0;

    Init () {

    }

    async Update (inputs: IBrainIn, outputs: IBrainOut) {
        this.dT += inputs.dT;

        for (let e of inputs.entities) {
            if (e.position.distance(inputs.self.position) < inputs.self.mass) {

            }
        }

        if (this.dT > 1) {
            this.dT = 0;
            outputs.releasePheromone();
        }
    }
}