import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { kThLargestPerfectSubtreeSizeInBinaryTree as kthLargestPerfectSubtree } from ".";

describe("3319. K-th Largest Perfect Subtree Size in Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			kthLargestPerfectSubtree(
				treeFromArray([5, 3, 6, 5, 2, 5, 7, 1, 8, null, null, 6, 8]),
				2,
			),
		).toBe(3);
		expect(
			kthLargestPerfectSubtree(treeFromArray([1, 2, 3, 4, 5, 6, 7]), 1),
		).toBe(7);
		expect(kthLargestPerfectSubtree(treeFromArray([1, 2, 3, null, 4]), 3)).toBe(
			-1,
		);
	});
});
