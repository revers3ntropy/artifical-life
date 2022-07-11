export default class kg {
    private readonly __v: number;

    constructor (kg?: number) {
        this.__v = kg || 0;
    }

    get grams () {
        return this.__v * 1000;
    }

    get tonnes () {
        return this.__v / 1000;
    }
}

export type mass = kg;