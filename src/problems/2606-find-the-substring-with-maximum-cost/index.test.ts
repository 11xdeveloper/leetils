import { describe, expect, it } from "bun:test";
import { findTheSubstringWithMaximumCost as maximumCostSubstring } from ".";

describe("2606. Find the Substring With Maximum Cost", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumCostSubstring("adaa", "d", [-1000])).toBe(2);
		expect(maximumCostSubstring("abc", "abc", [-1, -1, -1])).toBe(0);
	});
});
