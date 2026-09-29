import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { findLargestValueInEachTreeRow as largestValues } from ".";

const byDepth = (root: TreeNode | null): number[] => {
	const largest: number[] = [];
	const visit = (node: TreeNode | null, depth: number): void => {
		if (!node) return;
		largest[depth] = Math.max(
			largest[depth] ?? Number.NEGATIVE_INFINITY,
			node.val,
		);
		visit(node.left, depth + 1);
		visit(node.right, depth + 1);
	};
	visit(root, 0);
	return largest;
};

describe("515. Find Largest Value in Each Tree Row", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestValues(treeFromArray([1, 3, 2, 5, 3, null, 9]))).toEqual([
			1, 3, 9,
		]);
		expect(largestValues(treeFromArray([1, 2, 3]))).toEqual([1, 3]);
		expect(largestValues(null)).toEqual([]);
	});

	it("matches a depth-first search on random trees", () => {
		const random = createRandom(515);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, -9, 9);
			expect(largestValues(root)).toEqual(byDepth(root));
		}
	});
});
