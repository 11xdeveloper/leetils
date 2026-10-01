import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { maximumLevelSumOfABinaryTree as maxLevelSum } from ".";

/** Sums levels with a recursive walk. */
const byBruteForce = (root: TreeNode | null): number => {
	const sums: number[] = [];
	const visit = (node: TreeNode | null, depth: number): void => {
		if (!node) return;
		sums[depth] = (sums[depth] ?? 0) + node.val;
		visit(node.left, depth + 1);
		visit(node.right, depth + 1);
	};
	visit(root, 0);
	return sums.indexOf(Math.max(...sums)) + 1;
};

describe("1161. Maximum Level Sum of a Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxLevelSum(treeFromArray([1, 7, 0, 7, -8, null, null]))).toBe(2);
		expect(
			maxLevelSum(
				treeFromArray([
					989,
					null,
					10250,
					98693,
					-89388,
					null,
					null,
					null,
					-32127,
				]),
			),
		).toBe(2);
	});

	it("picks the smallest level on ties", () => {
		expect(maxLevelSum(treeFromArray([1, 1, 0]))).toBe(1);
	});

	it("handles all-negative trees", () => {
		expect(maxLevelSum(treeFromArray([-5, -1, -1]))).toBe(2);
	});

	it("matches a recursive walk on random trees", () => {
		const random = createRandom(1161);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 20, -5, 5) ?? treeFromArray([0]);
			expect(maxLevelSum(root)).toBe(byBruteForce(root));
		}
	});
});
