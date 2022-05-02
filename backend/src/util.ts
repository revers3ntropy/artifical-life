export function now () {
    return process.hrtime()[1] / 10**6 + process.hrtime()[0] * 10**3;
}

export type Map <T = unknown> = { [key: string | symbol]: T };

export type JSON = Map<any>;

export type radian = number;
export type degree = number;