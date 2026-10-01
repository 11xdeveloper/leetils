import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { maximumAverageSubtree } from ".";

/** Averages each node's subtree separately. */
const byBruteForce = (root: TreeNode | null): number =>
	Math.max(
		...nodesOf(root).map((node) => {
			const values = nodesOf(node).map(({ val }) => val);
			return values.reduce((sum, value) => sum + value, 0) / values.length;
		}),
	);

describe("1120. Maximum Average Subtree", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumAverageSubtree(treeFromArray([5, 6, 1]))).toBeCloseTo(6);
		expect(maximumAverageSubtree(treeFromArray([0, null, 1]))).toBeCloseTo(1);
	});

	it("handles a deep chain", () => {
		const values = Array.from({ length: 10000 }, (_, i) => i);
		const chain = treeFromArray(values.flatMap((value) => [value, null]));
		expect(maximumAverageSubtree(chain)).toBeCloseTo(9999);
	});

	it("matches averaging every subtree on random trees", () => {
		const random = createRandom(1120);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 20, 0, 100) ?? treeFromArray([3]);
			expect(maximumAverageSubtree(root)).toBeCloseTo(byBruteForce(root));
		}
	});
});
