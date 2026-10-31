import { describe, expect, it } from "bun:test";
import { countGoodCyclicRotations as countGoodRotations } from ".";

describe("4044. Count Good Cyclic Rotations", () => {
	it("solves the examples from the problem statement", () => {
		expect(countGoodRotations([1, 2, 3, 4, 5, 6])).toBe(3);
		expect(countGoodRotations([1, 2, 1, 2])).toBe(0);
	});
});
