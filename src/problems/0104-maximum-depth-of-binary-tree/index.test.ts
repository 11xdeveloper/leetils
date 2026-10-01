import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { maximumDepthOfBinaryTree } from ".";

const byRecursion = (node: TreeNode | null): number =>
	node ? 1 + Math.max(byRecursion(node.left), byRecursion(node.right)) : 0;

describe("104. Maximum Depth of Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumDepthOfBinaryTree(treeFromArray([3, 9, 20, null, null, 15, 7])),
		).toBe(3);
		expect(maximumDepthOfBinaryTree(treeFromArray([1, null, 2]))).toBe(2);
	});

	it("returns 0 for an empty tree", () => {
		expect(maximumDepthOfBinaryTree(null)).toBe(0);
	});

	it("handles a tree too deep for recursion", () => {
		let root: TreeNode | null = null;
		for (let i = 0; i < 100_000; i++) root = new TreeNode(i, null, root);
		expect(maximumDepthOfBinaryTree(root)).toBe(100_000);
	});

	it("matches a recursive definition on random trees", () => {
		const random = createRandom(104);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 30, 0, 9);
			expect(maximumDepthOfBinaryTree(root)).toBe(byRecursion(root));
		}
	});
});
