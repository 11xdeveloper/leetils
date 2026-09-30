import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { deepestLeavesSum } from ".";

/** Records every node's depth recursively. */
const byBruteForce = (root: TreeNode | null): number => {
	const sums: number[] = [];
	const visit = (node: TreeNode | null, depth: number): void => {
		if (!node) return;
		sums[depth] = (sums[depth] ?? 0) + node.val;
		visit(node.left, depth + 1);
		visit(node.right, depth + 1);
	};
	visit(root, 0);
	return sums.at(-1) ?? 0;
};

describe("1302. Deepest Leaves Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			deepestLeavesSum(
				treeFromArray([1, 2, 3, 4, 5, null, 6, 7, null, null, null, null, 8]),
			),
		).toBe(15);
		expect(
			deepestLeavesSum(
				treeFromArray([
					6,
					7,
					8,
					2,
					7,
					1,
					3,
					9,
					null,
					1,
					4,
					null,
					null,
					null,
					5,
				]),
			),
		).toBe(19);
	});

	it("matches a recursive walk on random trees", () => {
		const random = createRandom(1302);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 20, 1, 100);
			expect(deepestLeavesSum(root)).toBe(byBruteForce(root));
		}
	});
});
