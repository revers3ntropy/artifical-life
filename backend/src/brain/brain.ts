import * as tf from '@tensorflow/tfjs';
import type {Entity} from '../entity';

export interface IBrainIn {
    raw: tf.Tensor,
    entities: Entity[],
    self: Entity
}

export interface IBrainOut {
    turn: (amount: number) => void;
    move: (amount: number) => void;
    releasePheromone: () => void;
}

export interface Brain {
    Init:  (...args: any[]) => void;
    Update: (inputs: IBrainIn, outputs: IBrainOut) => Promise<void>;
}