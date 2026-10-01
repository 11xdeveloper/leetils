import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { findNearestRightNodeInBinaryTree as findNearestRightNode } from ".";

/** Groups nodes by depth with a recursive walk. */
const byBruteForce = (root: TreeNode | null, u: TreeNode): TreeNode | null => {
	const levels: TreeNode[][] = [];
	const visit = (node: TreeNode | null, depth: number): void => {
		if (!node) return;
		const level = levels[depth] ?? [];
		levels[depth] = level;
		level.push(node);
		visit(node.left, depth + 1);
		visit(node.right, depth + 1);
	};
	visit(root, 0);
	for (const level of levels) {
		const i = level.indexOf(u);
		if (i !== -1) return level[i + 1] ?? null;
	}
	return null;
};

const find = (root: TreeNode | null, val: number) =>
	nodesOf(root).find((node) => node.val === val) as TreeNode;

describe("1602. Find Nearest Right Node in Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		const first = treeFromArray([1, 2, 3, null, 4, 5, 6]);
		expect(findNearestRightNode(first, find(first, 4))?.val).toBe(5);
		const second = treeFromArray([3, null, 4, 2]);
		expect(findNearestRightNode(second, find(second, 2))).toBeNull();
	});

	it("matches grouping by depth on random trees", () => {
		const random = createRandom(1602);
		for (let run = 0; run < 200; run++) {
			const root = randomTree(random, 15, 1, 9) ?? treeFromArray([1]);
			const nodes = nodesOf(root);
			const u = nodes[random.int(0, nodes.length - 1)] as TreeNode;
			expect(findNearestRightNode(root, u)).toBe(byBruteForce(root, u));
		}
	});
});
