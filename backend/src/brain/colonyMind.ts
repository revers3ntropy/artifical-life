import {Brain, IBrainIn, IBrainOut} from './brain';

export class ColonyMind implements Brain {
    Init () {

    }

    async Update (inputs: IBrainIn, outputs: IBrainOut) {
        for (let e of inputs.entities) {
            if (e.position.distance(inputs.self.position) < inputs.self.mass) {

            }
        }
    }
}