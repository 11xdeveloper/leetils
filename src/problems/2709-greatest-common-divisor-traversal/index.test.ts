import { describe, expect, it } from "bun:test";
import { greatestCommonDivisorTraversal as canTraverseAllPairs } from ".";

describe("2709. Greatest Common Divisor Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(canTraverseAllPairs([2, 3, 6])).toBe(true);
		expect(canTraverseAllPairs([3, 9, 5])).toBe(false);
		expect(canTraverseAllPairs([4, 3, 12, 8])).toBe(true);
	});

	it("handles 1s", () => {
		expect(canTraverseAllPairs([1])).toBe(true);
		expect(canTraverseAllPairs([1, 1])).toBe(false);
	});
});
