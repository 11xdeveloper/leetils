import { describe, expect, it } from "bun:test";
import { sumOfGcdOfFormedPairs as gcdSum } from ".";

describe("3867. Sum of GCD of Formed Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(gcdSum([2, 6, 4])).toBe(2);
		expect(gcdSum([3, 6, 2, 8])).toBe(5);
	});
});
