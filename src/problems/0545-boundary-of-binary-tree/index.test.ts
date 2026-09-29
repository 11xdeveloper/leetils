import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { boundaryOfBinaryTree } from ".";

/** A recursive version of the definition. */
const byRecursion = (root: TreeNode | null): number[] => {
	if (!root) return [];
	const isLeaf = (node: TreeNode) => !node.left && !node.right;
	if (isLeaf(root)) return [root.val];
	const leftBoundary = (node: TreeNode | null): number[] =>
		!node || isLeaf(node)
			? []
			: [node.val, ...leftBoundary(node.left ?? node.right)];
	const rightBoundary = (node: TreeNode | null): number[] =>
		!node || isLeaf(node)
			? []
			: [...rightBoundary(node.right ?? node.left), node.val];
	const leaves = (node: TreeNode | null): number[] =>
		!node
			? []
			: isLeaf(node)
				? [node.val]
				: [...leaves(node.left), ...leaves(node.right)];
	return [
		root.val,
		...leftBoundary(root.left),
		...leaves(root.left),
		...leaves(root.right),
		...rightBoundary(root.right),
	];
};

describe("545. Boundary of Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(boundaryOfBinaryTree(treeFromArray([1, null, 2, 3, 4]))).toEqual([
			1, 3, 4, 2,
		]);
		expect(
			boundaryOfBinaryTree(
				treeFromArray([1, 2, 3, 4, 5, 6, null, null, null, 7, 8, 9, 10]),
			),
		).toEqual([1, 2, 4, 7, 8, 9, 10, 6, 3]);
		expect(boundaryOfBinaryTree(treeFromArray([1]))).toEqual([1]);
	});

	it("matches the recursive definition on random trees", () => {
		const random = createRandom(545);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, 0, 99);
			expect(boundaryOfBinaryTree(root)).toEqual(byRecursion(root));
		}
	});
});
