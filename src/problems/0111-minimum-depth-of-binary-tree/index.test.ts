import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { minimumDepthOfBinaryTree } from ".";

const byRecursion = (node: TreeNode | null): number => {
	if (!node) return 0;
	if (!node.left) return 1 + byRecursion(node.right);
	if (!node.right) return 1 + byRecursion(node.left);
	return 1 + Math.min(byRecursion(node.left), byRecursion(node.right));
};

describe("111. Minimum Depth of Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumDepthOfBinaryTree(treeFromArray([3, 9, 20, null, null, 15, 7])),
		).toBe(2);
		expect(
			minimumDepthOfBinaryTree(
				treeFromArray([2, null, 3, null, 4, null, 5, null, 6]),
			),
		).toBe(5);
	});

	it("only counts paths that end at a leaf", () => {
		expect(minimumDepthOfBinaryTree(treeFromArray([1, 2]))).toBe(2);
	});

	it("returns 0 for an empty tree", () => {
		expect(minimumDepthOfBinaryTree(null)).toBe(0);
	});

	it("matches a recursive definition on random trees", () => {
		const random = createRandom(111);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 30, 0, 9);
			expect(minimumDepthOfBinaryTree(root)).toBe(byRecursion(root));
		}
	});
});
