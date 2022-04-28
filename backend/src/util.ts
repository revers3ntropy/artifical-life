export function now () {
    return process.hrtime()[1] / 10**6 + process.hrtime()[0] * 10**3;
}