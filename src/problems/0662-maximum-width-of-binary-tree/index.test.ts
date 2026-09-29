import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { maximumWidthOfBinaryTree as widthOfBinaryTree } from ".";

/** Records each node's heap position with BigInt, so nothing overflows. */
const byPositions = (root: TreeNode | null): number => {
	const extremes: [bigint, bigint][] = [];
	const visit = (
		node: TreeNode | null,
		depth: number,
		position: bigint,
	): void => {
		if (!node) return;
		const [low, high] = extremes[depth] ?? [position, position];
		extremes[depth] = [
			position < low ? position : low,
			position > high ? position : high,
		];
		visit(node.left, depth + 1, 2n * position);
		visit(node.right, depth + 1, 2n * position + 1n);
	};
	visit(root, 0, 0n);
	return Math.max(0, ...extremes.map(([low, high]) => Number(high - low + 1n)));
};

describe("662. Maximum Width of Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(widthOfBinaryTree(treeFromArray([1, 3, 2, 5, 3, null, 9]))).toBe(4);
		expect(
			widthOfBinaryTree(treeFromArray([1, 3, 2, 5, null, null, 9, 6, null, 7])),
		).toBe(7);
		expect(widthOfBinaryTree(treeFromArray([1, 3, 2, 5]))).toBe(2);
	});

	it("matches exact heap positions on random trees", () => {
		const random = createRandom(662);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 25, 0, 9);
			expect(widthOfBinaryTree(root)).toBe(byPositions(root));
		}
	});
});
