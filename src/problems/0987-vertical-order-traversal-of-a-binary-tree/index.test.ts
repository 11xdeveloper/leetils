import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { verticalOrderTraversalOfABinaryTree as verticalTraversal } from ".";

describe("987. Vertical Order Traversal of a Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			verticalTraversal(treeFromArray([3, 9, 20, null, null, 15, 7])),
		).toEqual([[9], [3, 15], [20], [7]]);
		expect(verticalTraversal(treeFromArray([1, 2, 3, 4, 5, 6, 7]))).toEqual([
			[4],
			[2],
			[1, 5, 6],
			[3],
			[7],
		]);
		expect(verticalTraversal(treeFromArray([1, 2, 3, 4, 6, 5, 7]))).toEqual([
			[4],
			[2],
			[1, 5, 6],
			[3],
			[7],
		]);
	});
});
