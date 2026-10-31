import { describe, expect, it } from "bun:test";
import { sumOfElementsWithFrequencyDivisibleByK as sumDivisibleByK } from ".";

describe("3712. Sum of Elements With Frequency Divisible by K", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumDivisibleByK([1, 2, 2, 3, 3, 3, 3, 4], 2)).toBe(16);
		expect(sumDivisibleByK([1, 2, 3, 4, 5], 2)).toBe(0);
		expect(sumDivisibleByK([4, 4, 4, 1, 2, 3], 3)).toBe(12);
	});
});
