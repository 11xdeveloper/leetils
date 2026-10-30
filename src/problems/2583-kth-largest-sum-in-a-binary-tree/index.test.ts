import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { kthLargestSumInABinaryTree as kthLargestLevelSum } from ".";

describe("2583. Kth Largest Sum in a Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			kthLargestLevelSum(treeFromArray([5, 8, 9, 2, 1, 3, 7, 4, 6]), 2),
		).toBe(13);
		expect(kthLargestLevelSum(treeFromArray([1, 2, null, 3]), 1)).toBe(3);
	});

	it("returns -1 when there are too few levels", () => {
		expect(kthLargestLevelSum(treeFromArray([1, 2]), 3)).toBe(-1);
	});
});
