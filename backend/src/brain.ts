interface IBrainIn {
}

interface IBrainOut {
    turn: (amount: number) => void;
    move: (amount: number) => void;
}

export class Brain {
    init () {

    }

    update (inputs: IBrainIn, outputs: IBrainOut) {
        outputs.move(Math.random());
        outputs.turn(Math.random()*2-1);
    }
}