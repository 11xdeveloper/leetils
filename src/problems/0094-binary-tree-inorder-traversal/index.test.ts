import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { inorderValues, randomTree } from "../../testing/trees";
import { binaryTreeInorderTraversal } from ".";

describe("94. Binary Tree Inorder Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(binaryTreeInorderTraversal(treeFromArray([1, null, 2, 3]))).toEqual([
			1, 3, 2,
		]);
		expect(
			binaryTreeInorderTraversal(
				treeFromArray([1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9]),
			),
		).toEqual([4, 2, 6, 5, 7, 1, 3, 9, 8]);
		expect(binaryTreeInorderTraversal(null)).toEqual([]);
		expect(binaryTreeInorderTraversal(treeFromArray([1]))).toEqual([1]);
	});

	it("handles a tree too deep for recursion", () => {
		let root: TreeNode | null = null;
		for (let i = 0; i < 100_000; i++) root = new TreeNode(i, root);
		expect(binaryTreeInorderTraversal(root)).toHaveLength(100_000);
	});

	it("matches a recursive traversal on random trees", () => {
		const random = createRandom(94);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 30, -50, 50);
			expect(binaryTreeInorderTraversal(root)).toEqual(inorderValues(root));
		}
	});
});
