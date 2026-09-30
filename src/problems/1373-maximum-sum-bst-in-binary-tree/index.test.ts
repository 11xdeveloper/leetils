import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import {
	bstFromValues,
	inorderValues,
	nodesOf,
	randomTree,
} from "../../testing/trees";
import { maximumSumBstInBinaryTree as maxSumBST } from ".";

/** Checks each subtree's in-order values are strictly increasing. */
const byBruteForce = (root: TreeNode | null): number => {
	let best = 0;
	for (const node of nodesOf(root)) {
		const values = inorderValues(node);
		if (values.every((v, i) => i === 0 || v > (values[i - 1] ?? 0))) {
			best = Math.max(
				best,
				values.reduce((s, v) => s + v, 0),
			);
		}
	}
	return best;
};

describe("1373. Maximum Sum BST in Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxSumBST(
				treeFromArray([
					1,
					4,
					3,
					2,
					4,
					2,
					5,
					null,
					null,
					null,
					null,
					null,
					null,
					4,
					6,
				]),
			),
		).toBe(20);
		expect(maxSumBST(treeFromArray([4, 3, null, 1, 2]))).toBe(2);
		expect(maxSumBST(treeFromArray([-4, -2, -5]))).toBe(0);
	});

	it("handles a deep BST", () => {
		const values = Array.from({ length: 10000 }, (_, i) => i);
		expect(maxSumBST(bstFromValues(values))).toBe((9999 * 10000) / 2);
	});

	it("matches checking every subtree on random trees", () => {
		const random = createRandom(1373);
		for (let run = 0; run < 300; run++) {
			const root =
				random.next() < 0.5
					? randomTree(random, 15, -10, 10)
					: bstFromValues(random.array(random.int(1, 12), -10, 10));
			expect(maxSumBST(root)).toBe(byBruteForce(root));
		}
	});
});
