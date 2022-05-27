export default class kg {
    private readonly __v: number;

    constructor (value?: number) {
        this.__v = value || 0;
    }

    get grams () {
        return this.__v * 1000;
    }

    get tonnes () {
        return this.__v / 1000;
    }
}

export type mass = kg;