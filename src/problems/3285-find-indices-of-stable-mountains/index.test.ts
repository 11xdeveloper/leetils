import { describe, expect, it } from "bun:test";
import { findIndicesOfStableMountains as stableMountains } from ".";

describe("3285. Find Indices of Stable Mountains", () => {
	it("solves the examples from the problem statement", () => {
		expect(stableMountains([1, 2, 3, 4, 5], 2)).toEqual([3, 4]);
		expect(stableMountains([10, 1, 10, 1, 10], 3)).toEqual([1, 3]);
		expect(stableMountains([10, 1, 10, 1, 10], 10)).toEqual([]);
	});
});
