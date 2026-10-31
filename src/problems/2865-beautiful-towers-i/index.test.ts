import { describe, expect, it } from "bun:test";
import { beautifulTowersI as maximumSumOfHeights } from ".";

describe("2865. Beautiful Towers I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumSumOfHeights([5, 3, 4, 1, 1])).toBe(13);
		expect(maximumSumOfHeights([6, 5, 3, 9, 2, 7])).toBe(22);
		expect(maximumSumOfHeights([3, 2, 5, 5, 2, 3])).toBe(18);
	});
});
