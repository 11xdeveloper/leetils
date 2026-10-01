import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { binaryTreePostorderTraversal } from ".";

const byRecursion = (node: TreeNode | null): number[] =>
	node ? [...byRecursion(node.left), ...byRecursion(node.right), node.val] : [];

describe("145. Binary Tree Postorder Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			binaryTreePostorderTraversal(treeFromArray([1, null, 2, 3])),
		).toEqual([3, 2, 1]);
		expect(
			binaryTreePostorderTraversal(
				treeFromArray([1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9]),
			),
		).toEqual([4, 6, 7, 5, 2, 9, 8, 3, 1]);
		expect(binaryTreePostorderTraversal(null)).toEqual([]);
	});

	it("matches a recursive traversal on random trees", () => {
		const random = createRandom(145);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 30, -9, 9);
			expect(binaryTreePostorderTraversal(root)).toEqual(byRecursion(root));
		}
	});
});
