import { describe, expect, it } from "bun:test";
import { type TreeNode, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { inorderValues, nodesOf, randomTree } from "../../testing/trees";
import { constructBinaryTreeFromInorderAndPostorderTraversal as build } from ".";

const postorderValues = (root: TreeNode | null): number[] =>
	root
		? [...postorderValues(root.left), ...postorderValues(root.right), root.val]
		: [];

describe("106. Construct Binary Tree from Inorder and Postorder Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(treeToArray(build([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]))).toEqual([
			3,
			9,
			20,
			null,
			null,
			15,
			7,
		]);
		expect(treeToArray(build([-1], [-1]))).toEqual([-1]);
	});

	it("rebuilds random trees with distinct values", () => {
		const random = createRandom(106);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 30, 0, 0);
			for (const [i, node] of nodesOf(root).entries()) node.val = i * 7 - 50;
			expect(
				treeToArray(build(inorderValues(root), postorderValues(root))),
			).toEqual(treeToArray(root));
		}
	});
});
