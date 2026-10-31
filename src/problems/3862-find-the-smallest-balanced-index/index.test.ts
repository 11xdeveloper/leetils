import { describe, expect, it } from "bun:test";
import { findTheSmallestBalancedIndex as smallestBalancedIndex } from ".";

describe("3862. Find the Smallest Balanced Index", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestBalancedIndex([2, 1, 2])).toBe(1);
		expect(smallestBalancedIndex([2, 8, 2, 2, 5])).toBe(2);
		expect(smallestBalancedIndex([1])).toBe(-1);
	});

	it("isn't fooled by huge products", () => {
		expect(smallestBalancedIndex([1, 1e9, 1e9, 1e9])).toBe(-1);
	});
});
