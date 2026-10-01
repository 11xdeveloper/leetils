import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { binaryTreeLevelOrderTraversal } from ".";

/** Groups values by depth with a recursive preorder walk. */
const byDepth = (root: TreeNode | null): number[][] => {
	const levels: number[][] = [];
	const walk = (node: TreeNode | null, depth: number): void => {
		if (!node) return;
		const level = levels[depth] ?? [];
		level.push(node.val);
		levels[depth] = level;
		walk(node.left, depth + 1);
		walk(node.right, depth + 1);
	};
	walk(root, 0);
	return levels;
};

describe("102. Binary Tree Level Order Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			binaryTreeLevelOrderTraversal(
				treeFromArray([3, 9, 20, null, null, 15, 7]),
			),
		).toEqual([[3], [9, 20], [15, 7]]);
		expect(binaryTreeLevelOrderTraversal(treeFromArray([1]))).toEqual([[1]]);
		expect(binaryTreeLevelOrderTraversal(null)).toEqual([]);
	});

	it("matches grouping by depth on random trees", () => {
		const random = createRandom(102);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 30, -9, 9);
			expect(binaryTreeLevelOrderTraversal(root)).toEqual(byDepth(root));
		}
	});
});
