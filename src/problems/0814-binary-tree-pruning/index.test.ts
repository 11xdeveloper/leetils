import { describe, expect, it } from "bun:test";
import {
	TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { binaryTreePruning as pruneTree } from ".";

const byRecursion = (node: TreeNode | null): TreeNode | null => {
	if (!node) return null;
	const left = byRecursion(node.left);
	const right = byRecursion(node.right);
	return node.val === 1 || left || right
		? new TreeNode(node.val, left, right)
		: null;
};

describe("814. Binary Tree Pruning", () => {
	it("solves the examples from the problem statement", () => {
		expect(treeToArray(pruneTree(treeFromArray([1, null, 0, 0, 1])))).toEqual([
			1,
			null,
			0,
			null,
			1,
		]);
		expect(
			treeToArray(pruneTree(treeFromArray([1, 0, 1, 0, 0, 0, 1]))),
		).toEqual([1, null, 1, null, 1]);
		expect(
			treeToArray(pruneTree(treeFromArray([1, 1, 0, 1, 1, 0, 1, 0]))),
		).toEqual([1, 1, 0, 1, 1, null, 1]);
	});

	it("returns null when there are no ones", () => {
		expect(pruneTree(treeFromArray([0, 0, 0]))).toBeNull();
	});

	it("matches recursion on random trees", () => {
		const random = createRandom(814);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, 0, 1);
			const expected = treeToArray(byRecursion(root));
			expect(treeToArray(pruneTree(root))).toEqual(expected);
		}
	});
});
