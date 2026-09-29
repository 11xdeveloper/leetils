import { describe, expect, it } from "bun:test";
import { uniqueBinarySearchTreesII } from "../0095-unique-binary-search-trees-ii";
import { uniqueBinarySearchTrees } from ".";

describe("96. Unique Binary Search Trees", () => {
	it("solves the examples from the problem statement", () => {
		expect(uniqueBinarySearchTrees(3)).toBe(5);
		expect(uniqueBinarySearchTrees(1)).toBe(1);
	});

	it("matches the number of trees built by Unique Binary Search Trees II", () => {
		for (let n = 1; n <= 8; n++) {
			expect(uniqueBinarySearchTrees(n)).toBe(
				uniqueBinarySearchTreesII(n).length,
			);
		}
	});

	it("handles the constraint of 19 values", () => {
		// The 19th Catalan number, OEIS A000108.
		expect(uniqueBinarySearchTrees(19)).toBe(1767263190);
	});
});
