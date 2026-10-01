import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { binaryTreeLevelOrderTraversalII } from ".";

describe("107. Binary Tree Level Order Traversal II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			binaryTreeLevelOrderTraversalII(
				treeFromArray([3, 9, 20, null, null, 15, 7]),
			),
		).toEqual([[15, 7], [9, 20], [3]]);
		expect(binaryTreeLevelOrderTraversalII(treeFromArray([1]))).toEqual([[1]]);
		expect(binaryTreeLevelOrderTraversalII(null)).toEqual([]);
	});

	it("keeps each level left to right", () => {
		expect(
			binaryTreeLevelOrderTraversalII(treeFromArray([1, 2, 3, 4, 5])),
		).toEqual([[4, 5], [2, 3], [1]]);
	});
});
