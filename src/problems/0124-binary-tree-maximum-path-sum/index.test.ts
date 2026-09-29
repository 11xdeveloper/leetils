import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { binaryTreeMaximumPathSum } from ".";

/** Tries every pair of endpoints, summing the path between them. */
const byBruteForce = (root: TreeNode | null): number => {
	const nodes = nodesOf(root);
	const parent = new Map<TreeNode, TreeNode>();
	for (const node of nodes) {
		if (node.left) parent.set(node.left, node);
		if (node.right) parent.set(node.right, node);
	}
	const ancestors = (node: TreeNode): TreeNode[] => {
		const chain = [node];
		for (let up = parent.get(node); up; up = parent.get(up)) chain.push(up);
		return chain;
	};
	let best = Number.NEGATIVE_INFINITY;
	for (const a of nodes) {
		for (const b of nodes) {
			const fromA = ancestors(a);
			const fromB = ancestors(b);
			const meeting = fromA.find((node) => fromB.includes(node));
			if (!meeting) continue;
			const path = [
				...fromA.slice(0, fromA.indexOf(meeting) + 1),
				...fromB.slice(0, fromB.indexOf(meeting)),
			];
			best = Math.max(
				best,
				path.reduce((sum, node) => sum + node.val, 0),
			);
		}
	}
	return best;
};

describe("124. Binary Tree Maximum Path Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(binaryTreeMaximumPathSum(treeFromArray([1, 2, 3]))).toBe(6);
		expect(
			binaryTreeMaximumPathSum(treeFromArray([-10, 9, 20, null, null, 15, 7])),
		).toBe(42);
	});

	it("returns the largest value when every value is negative", () => {
		expect(binaryTreeMaximumPathSum(treeFromArray([-3, -1, -2]))).toBe(-1);
	});

	it("handles a tree too deep for recursion", () => {
		let root: TreeNode | null = null;
		for (let i = 0; i < 100_000; i++) root = new TreeNode(1, root);
		expect(binaryTreeMaximumPathSum(root)).toBe(100_000);
	});

	it("matches trying every pair of endpoints on random trees", () => {
		const random = createRandom(124);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 12, -10, 10) ?? new TreeNode(0);
			expect(binaryTreeMaximumPathSum(root)).toBe(byBruteForce(root));
		}
	});
});
