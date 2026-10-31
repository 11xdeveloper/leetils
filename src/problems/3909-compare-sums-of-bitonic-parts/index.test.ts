import { describe, expect, it } from "bun:test";
import { compareSumsOfBitonicParts as compareBitonicSums } from ".";

describe("3909. Compare Sums of Bitonic Parts", () => {
	it("solves the examples from the problem statement", () => {
		expect(compareBitonicSums([1, 3, 2, 1])).toBe(1);
		expect(compareBitonicSums([2, 4, 5, 2])).toBe(0);
		expect(compareBitonicSums([1, 2, 4, 3])).toBe(-1);
	});
});
