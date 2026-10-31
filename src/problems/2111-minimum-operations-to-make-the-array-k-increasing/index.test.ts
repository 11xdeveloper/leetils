import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeTheArrayKIncreasing as kIncreasing } from ".";

describe("2111. Minimum Operations to Make the Array K-Increasing", () => {
	it("solves the examples from the problem statement", () => {
		expect(kIncreasing([5, 4, 3, 2, 1], 1)).toBe(4);
		expect(kIncreasing([4, 1, 5, 2, 6, 2], 2)).toBe(0);
		expect(kIncreasing([4, 1, 5, 2, 6, 2], 3)).toBe(2);
	});

	it("keeps equal values", () => {
		expect(kIncreasing([2, 2, 1, 2, 2], 1)).toBe(1);
	});
});
