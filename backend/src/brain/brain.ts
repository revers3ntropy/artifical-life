import * as tf from "@tensorflow/tfjs";
import type { Entity } from "../entity";

export interface IBrainIn {
    raw: tf.Tensor,
    entities: Entity[]
}

export interface IBrainOut {
    turn: (amount: number) => void;
    move: (amount: number) => void;
}

export interface Brain {
    Init:  (...args: any[]) => void;
    Update: (inputs: IBrainIn, outputs: IBrainOut) => Promise<void>;
}