import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { pathSumIII } from ".";

/** Starts a downward walk from every node, counting matching sums. */
const byBruteForce = (root: TreeNode | null, target: number): number => {
	const from = (node: TreeNode | null, sum: number): number => {
		if (!node) return 0;
		const total = sum + node.val;
		return (
			(total === target ? 1 : 0) +
			from(node.left, total) +
			from(node.right, total)
		);
	};
	return nodesOf(root).reduce((count, node) => count + from(node, 0), 0);
};

describe("437. Path Sum III", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			pathSumIII(treeFromArray([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]), 8),
		).toBe(3);
		expect(
			pathSumIII(
				treeFromArray([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]),
				22,
			),
		).toBe(3);
	});

	it("handles sums beyond the 32-bit range", () => {
		expect(
			pathSumIII(
				treeFromArray([
					1e9,
					1e9,
					null,
					294967296,
					null,
					1e9,
					null,
					1e9,
					null,
					1e9,
				]),
				0,
			),
		).toBe(0);
	});

	it("matches starting a walk from every node on random trees", () => {
		const random = createRandom(437);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, -3, 3);
			const target = random.int(-4, 4);
			expect(pathSumIII(root, target)).toBe(byBruteForce(root, target));
		}
	});
});
