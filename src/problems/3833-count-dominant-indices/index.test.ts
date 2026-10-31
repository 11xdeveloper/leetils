import { describe, expect, it } from "bun:test";
import { countDominantIndices as dominantIndices } from ".";

describe("3833. Count Dominant Indices", () => {
	it("solves the examples from the problem statement", () => {
		expect(dominantIndices([5, 4, 3])).toBe(2);
		expect(dominantIndices([4, 1, 2])).toBe(1);
	});
});
