import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { sumOfLeftLeaves } from ".";

const byRecursion = (node: TreeNode | null, isLeft = false): number => {
	if (!node) return 0;
	if (!node.left && !node.right) return isLeft ? node.val : 0;
	return byRecursion(node.left, true) + byRecursion(node.right, false);
};

describe("404. Sum of Left Leaves", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfLeftLeaves(treeFromArray([3, 9, 20, null, null, 15, 7]))).toBe(
			24,
		);
		expect(sumOfLeftLeaves(treeFromArray([1]))).toBe(0);
	});

	it("matches a recursive walk on random trees", () => {
		const random = createRandom(404);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 25, -1000, 1000);
			expect(sumOfLeftLeaves(root)).toBe(byRecursion(root));
		}
	});
});
