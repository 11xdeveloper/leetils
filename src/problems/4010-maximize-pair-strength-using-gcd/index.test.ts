import { describe, expect, it } from "bun:test";
import { maximizePairStrengthUsingGcd as maxPairStrength } from ".";

describe("4010. Maximize Pair Strength Using GCD", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxPairStrength([2, 3, 5])).toBe(15);
		expect(maxPairStrength([4, 6, 8])).toBe(12);
		expect(maxPairStrength([3, 3])).toBe(1);
	});
});
