import { test, expect, assert, it, describe } from "vitest";
import { sum } from "./sum";

describe('sum function', () => {
    it('called with 0 and 1 is equal to 1', () => {
        expect(sum(0, 1)).toBe(1);
    });

    it('called with 0 and -1 is equal to -1', () => {
        expect(sum(0, -1)).toBe(-1);
    });
});



// *.test.js or *.spec.js
// *.test.jsx or *.spec.jsx