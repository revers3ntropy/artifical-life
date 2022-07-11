export * from './world';

import { World } from "./world";

// shared global state
export const sim = {
    world: new World
};