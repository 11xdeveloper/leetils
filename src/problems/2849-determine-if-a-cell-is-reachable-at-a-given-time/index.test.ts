import { describe, expect, it } from "bun:test";
import { determineIfACellIsReachableAtAGivenTime as isReachableAtTime } from ".";

describe("2849. Determine if a Cell Is Reachable at a Given Time", () => {
	it("solves the examples from the problem statement", () => {
		expect(isReachableAtTime(2, 4, 7, 7, 6)).toBe(true);
		expect(isReachableAtTime(3, 1, 7, 3, 3)).toBe(false);
	});

	it("can't stay put for exactly one second", () => {
		expect(isReachableAtTime(1, 1, 1, 1, 1)).toBe(false);
		expect(isReachableAtTime(1, 1, 1, 1, 0)).toBe(true);
		expect(isReachableAtTime(1, 1, 1, 1, 2)).toBe(true);
	});
});
