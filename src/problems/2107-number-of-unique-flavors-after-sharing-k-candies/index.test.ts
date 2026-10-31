import { describe, expect, it } from "bun:test";
import { numberOfUniqueFlavorsAfterSharingKCandies as shareCandies } from ".";

describe("2107. Number of Unique Flavors After Sharing K Candies", () => {
	it("solves the examples from the problem statement", () => {
		expect(shareCandies([1, 2, 2, 3, 4, 3], 3)).toBe(3);
		expect(shareCandies([2, 2, 2, 2, 3, 3], 2)).toBe(2);
		expect(shareCandies([2, 4, 5], 0)).toBe(3);
	});

	it("can give away every candy", () => {
		expect(shareCandies([1, 2, 3], 3)).toBe(0);
	});
});
