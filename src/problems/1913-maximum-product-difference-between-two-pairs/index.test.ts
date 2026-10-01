import { describe, expect, it } from "bun:test";
import { maximumProductDifferenceBetweenTwoPairs as maxProductDifference } from ".";

describe("1913. Maximum Product Difference Between Two Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProductDifference([5, 6, 2, 7, 4])).toBe(34);
		expect(maxProductDifference([4, 2, 5, 9, 7, 4, 8])).toBe(64);
	});
});
