import * as tf from '@tensorflow/tfjs';
import type {Brain, IBrainIn, IBrainOut} from './brain';

export class NNBrain implements Brain {
    model = tf.sequential();

    Init (hiddenLayerSize: number, inpLen: number, outputLen: number) {

        this.model.add(
            tf.layers.dense({
                inputShape: [inpLen],
                units: hiddenLayerSize,
                activation: "tanh",
            })
        );
        this.model.add(
            tf.layers.dense({
                units: hiddenLayerSize,
                activation: "tanh",
            })
        );
        this.model.add(
            tf.layers.dense({
                units: outputLen,
            })
        );
        // this.model.setWeights([]);
    }

    async Update (inputs: IBrainIn, outputs: IBrainOut) {

        const rawOut = this.model.predict(inputs.raw.reshape([1, 10]));
        if (Array.isArray(rawOut)) throw 'Neural output expected to be Tensor, not array';

        const arrOut = await rawOut.array();
        if (!Array.isArray(arrOut) || !Array.isArray(arrOut[0])) {
            throw 'incorrect neural output shape';
        }
        if (typeof arrOut[0][0] !== 'number') throw 'incorrect neural output shape';

        // @ts-ignore - cast to this type as it is known it is, but the ts compiler doesn't
        const cleanOut: number[][] = arrOut;

        outputs.move(Math.abs(cleanOut[0][0]));
        outputs.turn(cleanOut[0][1]);
    }
}