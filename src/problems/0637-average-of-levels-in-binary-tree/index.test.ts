import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { averageOfLevelsInBinaryTree as averageOfLevels } from ".";

const byDepth = (root: TreeNode | null): number[] => {
	const levels: number[][] = [];
	const visit = (node: TreeNode | null, depth: number): void => {
		if (!node) return;
		const level = levels[depth] ?? [];
		level.push(node.val);
		levels[depth] = level;
		visit(node.left, depth + 1);
		visit(node.right, depth + 1);
	};
	visit(root, 0);
	return levels.map(
		(values) => values.reduce((a, b) => a + b, 0) / values.length,
	);
};

describe("637. Average of Levels in Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			averageOfLevels(treeFromArray([3, 9, 20, null, null, 15, 7])),
		).toEqual([3, 14.5, 11]);
		expect(averageOfLevels(treeFromArray([3, 9, 20, 15, 7]))).toEqual([
			3, 14.5, 11,
		]);
	});

	it("matches a depth-first search on random trees", () => {
		const random = createRandom(637);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, -100, 100);
			expect(averageOfLevels(root)).toEqual(byDepth(root));
		}
	});
});
