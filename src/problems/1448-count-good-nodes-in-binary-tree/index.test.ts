import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { countGoodNodesInBinaryTree as goodNodes } from ".";

/** Checks each node against its whole path. */
const byBruteForce = (root: TreeNode | null): number => {
	let good = 0;
	const visit = (node: TreeNode | null, path: number[]): void => {
		if (!node) return;
		if (path.every((value) => value <= node.val)) good++;
		visit(node.left, [...path, node.val]);
		visit(node.right, [...path, node.val]);
	};
	visit(root, []);
	return good;
};

describe("1448. Count Good Nodes in Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(goodNodes(treeFromArray([3, 1, 4, 3, null, 1, 5]))).toBe(4);
		expect(goodNodes(treeFromArray([3, 3, null, 4, 2]))).toBe(3);
		expect(goodNodes(treeFromArray([1]))).toBe(1);
	});

	it("matches checking every path on random trees", () => {
		const random = createRandom(1448);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 20, -5, 5);
			expect(goodNodes(root)).toBe(byBruteForce(root));
		}
	});
});
