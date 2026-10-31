import { describe, expect, it } from "bun:test";
import { smallestValueAfterReplacingWithSumOfPrimeFactors as smallestValue } from ".";

describe("2507. Smallest Value After Replacing With Sum of Prime Factors", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestValue(15)).toBe(5);
		expect(smallestValue(3)).toBe(3);
	});

	it("settles on 4, which is its own prime factor sum", () => {
		expect(smallestValue(4)).toBe(4);
		expect(smallestValue(8)).toBe(5);
	});
});
