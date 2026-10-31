import { describe, expect, it } from "bun:test";
import { maximumCandiesAllocatedToKChildren as maximumCandies } from ".";

describe("2226. Maximum Candies Allocated to K Children", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumCandies([5, 8, 6], 3)).toBe(5);
		expect(maximumCandies([2, 5], 11)).toBe(0);
	});
});
