import * as tf from '@tensorflow/tfjs';

interface IBrainIn {
    raw: tf.Tensor
}

interface IBrainOut {
    turn: (amount: number) => void;
    move: (amount: number) => void;
}

export class Brain {
    model = tf.sequential();

    init (hiddenLayers: number, inpShape: tf.Shape, outputLen: number) {

        this.model.add(
            tf.layers.dense({
                inputShape: inpShape,
                units: hiddenLayers,
                activation: "tanh",
            })
        );
        this.model.add(
            tf.layers.dense({
                units: hiddenLayers,
                activation: "tanh",
            })
        );
        this.model.add(
            tf.layers.dense({
                units: outputLen,
            })
        );
        //this.model.setWeights([]);
    }

    async update (inputs: IBrainIn, outputs: IBrainOut) {

        const rawOut = this.model.predict(inputs.raw.reshape([1, 10]));
        if (Array.isArray(rawOut)) throw 'Neural output expected to be Tensor, not array';

        const arrOut = await rawOut.array();
        if (!Array.isArray(arrOut)) throw 'incorrect neural output shape';
        if (!Array.isArray(arrOut[0])) throw 'incorrect neural output shape';
        if (typeof arrOut[0][0] !== 'number') throw 'incorrect neural output shape';

        // @ts-ignore
        const cleanOut: number[][] = arrOut;

        outputs.move(Math.abs(cleanOut[0][0]));
        outputs.turn(cleanOut[0][1]);
    }
}